import React from 'react';
import './App.css';
import { Router } from './Router';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div>
        <Link to="/">Home</Link>
        <Link to="/me">Profile</Link>
      </div>
      <Router/>
    </div>
  );
}

export default App;
