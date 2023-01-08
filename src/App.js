import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { app } from './firebase';
import { getFirestore, onSnapshot, collection, doc, query, orderBy, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
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
  const [progresspercent, setProgresspercent] = useState(0);

  //let dbRef = firebase.firestore();
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  // Sortataan ja haetaan data Firestoresta. Tallennetaan haettu data state-muuttujaan. 
  // Suoritetaan kerran komponentin renderöidyttyä (mount).
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user); 
        // Hae data Firestoresta koon mukaan lajiteltuna
        const q = query(collection(db, "users", user.uid, "data"), orderBy("koko"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          setData(data);
        });
      }
    });
  }, []); // [] on tärkeä! Muuten useEffect suoritetaan uudestaan ja uudestaan.


  /**
   * Funktio, jota ItemForm-komponentti kutsuu lähettäessään datan.
   * Tallentaa datan Firestoren tietokantaan.
   * 
   * @param {*} newData 
   */
  const handleFormSubmit = (newData, file) => {
    // Jos lähetetään lomakkeen mukana kuvatiedosto, tallennetaan se ensin Storageen
    if(file) {
      const storageRef = ref(storage, `${user.uid}/${newData.id}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on("state_changed",
          (snapshot) => {
              const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setProgresspercent(progress);
          },
          (error) => {
            toast.error("Virhe kuvan tallennuksessa: " + error);
            return;
          },
          () => {
              getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                //setImgUrl(downloadURL)
                newData.imgUrl = downloadURL;
                newData.tiedostonimi = file.name;
                sendDataToFirestore(newData);
              });
          }
      );
    } else {
      sendDataToFirestore(newData);
    }
  }

  const sendDataToFirestore = (newData) => {
    setDoc(doc(db, "users", user.uid, "data", newData.id), newData, { merge: true })
    .then(() => {
      toast.success(`"${newData.nimike}" tallennettu!`)
    })
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
    deleteDoc(doc(db, "users", user.uid, "data", id))
    .then(toast.success("Nimike poistettu"))
    .catch(error => { toast.error("Virhe tietoa poistettaessa: " + error) });
  }

  const handleImageDelete = (id, tiedostonimi) => {
    
    const imageRef = ref(storage, `${user.uid}/${id}/${tiedostonimi}`);

    deleteObject(imageRef)
    .then(() => {
      const kuvaData = {
        tiedostonimi: "",
        imgUrl: ""
      }
      setDoc(doc(db, "users", user.uid, "data", id), kuvaData, { merge: true })
      .then(() => {
        toast.success("Kuva poistettu");
      })
      .catch(error => { toast.error("Virhe kuvan viittausta poistettaessa: " + error) });
      
    })
    .catch(error => { toast.error("Virhe kuvaa poistettaessa: " + error) });
  }


  /** 
   * Funktio, joka hoitaa sisäänkirjautumisen (Firebase Authentication, Googlen tunnuksilla). 
   * Tallentaa käyttäjän tiedot state-muuttujaan (user). Jos kirjautuminen ei onnistu, tallentaa
   * state-muuttujaan virheilmoituksen.
   * */
  const login = () => {
    signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;
      setUser(user);
      setError(null);
    })
    .catch(error => {
      const errorMessage = error.message;
      setError(errorMessage);
    });
  }

  /**
   * Funktio, joka hoitaa uloskirjautumisen. Tallentaa state-muuttujaan user: null ja 
   * tyhjentää viittauksen tietokantaan.
   */
  const logout = () => {
    signOut(auth)
    .then(() => {
      setUser(null);
      //db = null;
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
        <Route path="/add" render={() => 
          <AddItem 
            onFormSubmit={handleFormSubmit} />
        } />
        <Route path="/edit/:id" render={(props) =>
          <EditItem
            data={data}
            onFormSubmit={handleFormSubmit}
            onDeleteImage={handleImageDelete}
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