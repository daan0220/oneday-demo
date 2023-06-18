import React from 'react';
import { Avatar, Typography, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

interface AvatarSectionProps {
  imageUrl: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  website: string;
  handleEditProfile: () => void;
}

const EditLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'underline',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'none',
  },
}));

const AvatarSection: React.FC<AvatarSectionProps> = ({
  imageUrl,
  name,
  bio,
  followers,
  following,
  website,
  handleEditProfile,
}) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={3}>
        <Avatar alt="imageUrl" src={imageUrl} sx={{ width: 200, height: 200 }} />
      </Grid>
      <Grid item xs={12} md={9}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {name}
          </Typography>
          <EditLink to="/edit-profile" onClick={handleEditProfile}>
            Edit Profile
          </EditLink>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {bio}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {followers} Followers &middot; {following} Following
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {website}
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/timer">
          Start Studying
        </Button>
      </Grid>
    </Grid>
  );
};

export default AvatarSection;
