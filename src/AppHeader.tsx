import React from 'react';
import { AppBar, Toolbar, IconButton, Badge } from '@mui/material';
import { Notifications as NotificationsIcon, Search as SearchIcon, Person as PersonIcon } from '@mui/icons-material';

interface AppHeaderProps {
  sx?: {
    backgroundColor?: string;
  };
}

const AppHeader: React.FC<AppHeaderProps> = ({ sx }) => {
  return (
    <AppBar position="sticky" color="default" elevation={0} sx={sx}>
      <Toolbar>
        <div style={{ flexGrow: 1 }} />
        <IconButton size="large" color="inherit" aria-label="notifications">
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton size="large" color="inherit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
