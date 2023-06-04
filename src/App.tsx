import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './firebase';
import Auth from './Auth';
import { HomePage } from './HomePage';

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false); // ログイン状態を管理する変数

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={loggedIn ? <Navigate to="/home" /> : <Auth setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/home"
          element={loggedIn ? <HomePage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
