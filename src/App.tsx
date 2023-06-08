import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './firebase';
import Auth from './Login';
import HomePage from "./Profile";
import Main from "./Main";


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
        <Route
          path="/main"
          element={loggedIn ? <Main /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
