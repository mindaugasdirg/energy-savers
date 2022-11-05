import React from 'react';
import './App.css';
import { Router } from './Router';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <>
      <CssBaseline />
      <div className="App">
        <div>
          <Link to="/">Home</Link>
          <Link to="/me">Profile</Link>
          <Link to="/camera">Camera</Link>
        </div>
        <Router/>
      </div>
    </>
  );
}

export default App;
