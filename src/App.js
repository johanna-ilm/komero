import React, { useState } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import testdata from './testdata';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Items from './components/Items/Items';
import Stats from './components/Stats/Stats';
import Menu from './components/Menu/Menu';
import AddItem from './components/AddItem/AddItem';
import EditItem from './components/EditItem/EditItem';


function App() {

  const [data, setData] = useState(testdata);


  const handleFormSubmit = newData => {
    let storedData = data.slice();
    const index = storedData.findIndex(item => item.id === newData.id);
    if (index >= 0) {
      storedData[index] = newData;
    } else {
      storedData.push(newData);
    }
    storedData.sort((a, b) => {
      const aSize = parseInt(a.koko); // TODO! Korjaa sorttaus
      const bSize = parseInt(b.koko);
      return aSize - bSize;
    });
    setData(storedData);
  }

  const handleItemDelete = id => {
    let storedData = data.slice();
    storedData = storedData.filter(item => item.id !== id);
    setData(storedData);
  }


  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/list/:selectedCategory" render={(props) =>
          <Items data={data} {...props} />} />
        <Route path="/stats" render={() => <Stats data={data} kokoData={data.koko} />} />
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