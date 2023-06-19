import React from 'react';
import { AppBar, Toolbar, IconButton, Badge } from '@mui/material';
import { Notifications as NotificationsIcon, Search as SearchIcon, Person as PersonIcon, Chat as ChatIcon, Timeline as TimelineIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
  const navigate = useNavigate();

  const handleDMIconClick = () => {
    navigate('/dm-list');
  };

  const handleTimelineIconClick = () => {
    navigate('/timeline');
  };

  const handleProfileIconClick = () => {
    navigate('/main');
  };

  const handleSearchIconClick = () => {
    navigate('/search');
  };

  const handleNotificationsIconClick = () => {
    navigate('/notifications');
  };

  return (
    <AppBar position="sticky" color="default" elevation={0} sx={{ backgroundColor: '#80DEEA' }}>
      <Toolbar>
        <div style={{ flexGrow: 1 }} />
        <IconButton size="large" color="inherit" aria-label="notifications" onClick={handleNotificationsIconClick}>
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton size="large" color="inherit" aria-label="search" onClick={handleSearchIconClick}>
          <SearchIcon />
        </IconButton>
        <IconButton size="large" color="inherit" aria-label="person" onClick={handleProfileIconClick}>
          <PersonIcon />
        </IconButton>
        <IconButton size="large" color="inherit" aria-label="chat" onClick={handleDMIconClick}>
          <ChatIcon />
        </IconButton>
        <IconButton size="large" color="inherit" aria-label="timeline" onClick={handleTimelineIconClick}>
          <TimelineIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
