import React from 'react';
import { BrowserRouter as Router, } from 'react-router-dom';
import './firebase';
import Auth from './Auth';



function App() {
  return (

    <Router> 
      <Auth />
    </Router>
    
  );
}

export default App;


