import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import firebase from './firebase';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Items from './components/Items/Items';
import Stats from './components/Stats/Stats';
import Menu from './components/Menu/Menu';
import AddItem from './components/AddItem/AddItem';
import EditItem from './components/EditItem/EditItem';


function App() {

  const [data, setData] = useState([]);

  let refData = firebase.firestore().collection('data');

  // Sortataan ja haetaan data Firestoresta. Tallennetaan haettu data state-muuttujaan. 
  // Suoritetaan kerran komponentin renderöidyttyä (mount).
  useEffect(() => {
    refData.orderBy("koko").onSnapshot((docs) => {
      let data = [];
      docs.forEach((doc) => {
        let docData = doc.data();
        data.push(docData);
      });
      setData(data);
    });
  }, []); // [] on tärkeä! Muuten useEffect suoritetaan uudestaan ja uudestaan. 


  const handleFormSubmit = newData => {
    refData.doc(newData.id).set(newData);
  }

  const handleItemDelete = id => {
    refData.doc(id).delete().then().catch(error => { console.error("Virhe tietoa poistettaessa: ", error) });
  }


  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/list/:selectedCategory" render={(props) =>
          <Items data={data} {...props} />} />
        <Route path="/stats" render={() => <Stats data={data} />} />
        <Route path="/add" render={() => <AddItem onFormSubmit={handleFormSubmit} />} />
        <Route path="/edit/:id" render={(props) =>
          <EditItem
            data={data}
            onFormSubmit={handleFormSubmit}
            onDeleteItem={handleItemDelete}
            {...props} />} />
        <Menu />
      </div>
    </Router>
  );
}

export default App;