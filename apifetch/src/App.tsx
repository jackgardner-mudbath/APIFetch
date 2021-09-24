import React from 'react';
import Navbar from './components/Navbar';
import Stores from './components/Stores';
import Games from './components/Games';
import Deals from './components/Deals';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Stores}/>
          <Route path="/games" component={Games}/>
          <Route path="/deals" component={Deals}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;