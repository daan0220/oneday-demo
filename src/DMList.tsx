import React from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Chat as ChatIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DMList = () => {
  const navigate = useNavigate();

  const handleDMClick = () => {
    navigate('/dm-list'); // '/dm'に遷移する
  };

  return (
    <Box sx={{ p: 2 }}>
      <List sx={{ mt: 2 }}>
        <ListItem button onClick={handleDMClick} sx={{ p: 2, backgroundColor: '#F5F5F5', borderRadius: '8px' }}>
          <ListItemIcon>
            <ChatIcon sx={{ fontSize: 24 }} />
          </ListItemIcon>
          <ListItemText
            primary="User 1"
            secondary="Last message"
            primaryTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
            secondaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
          />
        </ListItem>
        <ListItem button onClick={handleDMClick} sx={{ p: 2, backgroundColor: '#F5F5F5', borderRadius: '8px' }}>
          <ListItemIcon>
            <ChatIcon sx={{ fontSize: 24 }} />
          </ListItemIcon>
          <ListItemText
            primary="User 2"
            secondary="Last message"
            primaryTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
            secondaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
          />
        </ListItem>
        <ListItem button onClick={handleDMClick} sx={{ p: 2, backgroundColor: '#F5F5F5', borderRadius: '8px' }}>
          <ListItemIcon>
            <ChatIcon sx={{ fontSize: 24 }} />
          </ListItemIcon>
          <ListItemText
            primary="User 3"
            secondary="Last message"
            primaryTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
            secondaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
          />
        </ListItem>
        {/* 追加のユーザーのリストアイテムをここに追加 */}
      </List>
    </Box>
  );
};

export default DMList;
