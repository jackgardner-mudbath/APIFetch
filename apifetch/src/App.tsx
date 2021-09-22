import React from 'react';
import Navbar from './components/Navbar';
import Stores from './components/Stores';
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Stores/>
    </div>
  );
}

export default App;