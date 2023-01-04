import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import firebase, { provider, auth } from './firebase';
import toast, { Toaster } from 'react-hot-toast';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Items from './components/Items/Items';
import Stats from './components/Stats/Stats';
import Menu from './components/Menu/Menu';
import AddItem from './components/AddItem/AddItem';
import EditItem from './components/EditItem/EditItem';
import Content from './components/Content/Content';
import Logout from './components/Logout/Logout';
import Button from './components/buttons';


// Sovelluksen juurikomponentti
function App() {

  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  let dbRef = firebase.firestore();

  // Sortataan ja haetaan data Firestoresta. Tallennetaan haettu data state-muuttujaan. 
  // Suoritetaan kerran komponentin renderöidyttyä (mount).
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        dbRef.collection("users")
          .doc(user.uid)
          .collection('data')
          .orderBy("koko")
          .onSnapshot((docs) => {
            let data = [];
            docs.forEach((doc) => {
              let docData = doc.data();
              data.push(docData);
            });
            setData(data);
          });
      }
    })
  }, []); // [] on tärkeä! Muuten useEffect suoritetaan uudestaan ja uudestaan. 


  /**
   * Funktio, jota ItemForm-komponentti kutsuu lähettäessään datan.
   * Tallentaa datan Firestoren tietokantaan.
   * 
   * @param {*} newData 
   */
  const handleFormSubmit = newData => {
    dbRef.collection("users")
      .doc(user.uid)
      .collection('data')
      .doc(newData.id)
      .set(newData)
      .then(toast.success(`"${newData.nimike}" tallennettu!`))
      .catch(error => { toast.error("Virhe nimikkeen tallennuksessa: " + error) });
  }

  /**
   * Funktio, jota ItemForm-komponentti kutsuu, kun halutaan poistaa yksittäinen nimike.
   * Poistaa nimikkeen datan Firestoren tietokannasta. Jos poistaminen ei onnistu, näyttää
   * konsolissa virheilmoituksen.
   * 
   * @param {*} id 
   */
  const handleItemDelete = id => {
    dbRef.collection("users")
      .doc(user.uid)
      .collection('data')
      .doc(id)
      .delete()
      .then(toast.success("Nimike poistettu"))
      .catch(error => { toast.error("Virhe tietoa poistettaessa: " + error) });
  }


  /** 
   * Funktio, joka hoitaa sisäänkirjautumisen (Firebase Authentication, Googlen tunnuksilla). 
   * Tallentaa käyttäjän tiedot state-muuttujaan (user). Jos kirjautuminen ei onnistu, tallentaa
   * state-muuttujaan virheilmoituksen.
   * */
  const login = () => {
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      setUser(user);
      setError(null);
    }).catch((error) => {
      const errorMessage = error.message;
      setError(errorMessage);
    });
  }

  /**
   * Funktio, joka hoitaa uloskirjautumisen. Tallentaa state-muuttujaan user: null ja 
   * tyhjentää viittauksen tietokantaan.
   */
  const logout = () => {
    auth.signOut().then(() => {
      setUser(null);
      dbRef = null;
    });
  }


  // Sisäänkirjautumissivu (näytetään, jos user-muuttujaan ei ole tallennettu käyttäjän tietoja)
  if (!user) {
    return (
      <Router>
        <div className="App">
          <Header />
          <Content>
            <div className="app__header"><h2>Avaa Komero</h2></div>
            <div className="app__login">
              <div className="app_login-legend">Et ole vielä kirjautunut sisään Komeroon.</div>
              <div className="app__login-button"><Button primary onClick={login} >Kirjaudu sisään</Button></div>
              {/* Jos sisäänkirjautuminen ei onnistu, näytetään state-muuttujaan tallennettu virheilmoitus */}
              <div>{error ? <p>{error}</p> : null}</div>
            </div>
          </Content>
        </div>
      </Router>
    );
  }

  // Kirjautuneelle käyttäjälle:
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/list/:selectedCategory" render={(props) =>
          <Items data={data} {...props} />} />
        <Route path="/add" render={() => <AddItem onFormSubmit={handleFormSubmit} />} />
        <Route path="/edit/:id" render={(props) =>
          <EditItem
            data={data}
            onFormSubmit={handleFormSubmit}
            onDeleteItem={handleItemDelete}
            {...props} />} />
        <Route path="/stats" render={() => <Stats data={data} />} />
        <Route path="/logout" render={() => <Logout onLogout={logout} user={user} />} />
        <Toaster />
        <Menu />
      </div>
    </Router>
  );
}

export default App;