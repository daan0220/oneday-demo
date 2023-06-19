import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import './firebase';
import Auth from './Login';
import HomePage from './Profile';
import Main from './Main';
import EditProfile from './EditProfile';
import TimerScreen from './TimerScreen';
import AppHeader from './AppHeader';
import DMList from './DMList';
import Timeline from './Timeline';
import SearchPage from './SearchPage'; // 新しく追加
import NotificationList from './NotificationList'; // 新しく追加

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // ログイン状態を管理する変数

  return (
    <Router>
      <Box>
        {loggedIn && <AppHeader />}
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
          <Route
            path="/edit-profile"
            element={<EditProfile />}
          />
          <Route
            path="/timer"
            element={<TimerScreen />}
          />
          <Route
            path="/dm-list"
            element={<DMList />}
          />
          <Route
            path="/timeline"
            element={<Timeline />}
          />
          <Route
            path="/search"
            element={<SearchPage />}
          />
          <Route
            path="/notifications"
            element={<NotificationList />}
          />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
