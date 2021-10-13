import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Stores from './components/Stores';
import Games from './components/Games';
import Deals from './components/Deals';
import Wishlist from './components/Wishlist';
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Stores}/>
          <Route path="/games" component={Games}/>
          <Route path="/deals" component={Deals}/>
          <Route path="/wishlist" component={Wishlist}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;