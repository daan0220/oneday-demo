import React from 'react';
import { Typography, Avatar, Box, Grid, Paper, createTheme, ThemeProvider, Divider } from '@mui/material';
import { styled } from '@mui/system';

const theme = createTheme();

const EditLink = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'underline',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'none',
  },
}));

const Post = ({ title, content }: { title: string; content: string }) => {
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body1">{content}</Typography>
    </Paper>
  );
};

const Main = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: '#f7f7f7', padding: '20px' }}>
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <Avatar
                alt="Profile Picture"
                src="https://example.com/profile-picture.jpg"
                sx={{ width: 200, height: 200 }}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  John Doe
                </Typography>
                <EditLink variant="body1">Edit Profile</EditLink>
              </Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor velit in nisi eleifend, eu
                dapibus mauris fermentum. Donec faucibus fringilla eros, at auctor risus aliquam et. Quisque ut
                pretium risus. Nunc at tempor mauris.
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  Followers: 1000
                </Typography>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  Following: 500
                </Typography>
              </Box>
              <Typography variant="body1">
                Website: <a href="https://example.com">example.com</a>
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" sx={{ mb: 2 }}>
          My Posts
        </Typography>

        <Post title="First Post" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
        <Post title="Second Post" content="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
        <Post title="Third Post" content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." />
      </Box>
    </ThemeProvider>
  );
};

export default Main;
