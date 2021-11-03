import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Stores from './pages/Stores';
import Games from './pages/Games';
import Deals from './pages/Deals';
import Wishlist from './pages/Wishlist';
import { Links } from './models/links.models';
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route path={Links.Home} exact component={Stores}/>
          <Route path={Links.Deals} component={Deals}/>
          <Route path={Links.Search} component={Games}/>
          <Route path={Links.Wishlist} component={Wishlist}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;