import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import testdata from './testdata';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Items from './components/Items/Items';
import Stats from './components/Stats/Stats';
import Settings from './components/Settings/Settings';
import Menu from './components/Menu/Menu';
import AddItem from './components/AddItem/AddItem';
import EditItem from './components/EditItem/EditItem';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: testdata,
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
  }

  handleFormSubmit(newData) {
    let storedData = this.state.data.slice();
    const index = storedData.findIndex(item => item.id === newData.id);
    if (index >= 0) {
      storedData[index] = newData;
    } else {
      storedData.push(newData);
    }
    storedData.sort((a, b) => {
      const aSize = a.koko;
      const bSize = b.koko;
      return aSize - bSize;
    });
    this.setState({
      data: storedData
    })
  }

  handleItemDelete(id) {
    let storedData = this.state.data.slice();
    storedData = storedData.filter(item => item.id !== id);
    this.setState({
      data: storedData
    })
  }


  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/list" render={() => <Items data={this.state.data} />} />
          <Route path="/stats" component={Stats} />
          <Route path="/settings" component={Settings} />
          <Route path="/add" render={() => <AddItem onFormSubmit={this.handleFormSubmit} />} />
          <Route path="/edit/:id" render={(props) =>
            <EditItem
              data={this.state.data}
              onFormSubmit={this.handleFormSubmit}
              onDeleteItem={this.handleItemDelete}
              {...props} />} />
          <Menu />
        </div>
      </Router>
    );
  }
}

export default App;