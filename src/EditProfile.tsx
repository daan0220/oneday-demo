import React, { useEffect, useState, useRef } from 'react';
import {
  Typography,
  Avatar,
  Box,
  Grid,
  Paper,
  createTheme,
  ThemeProvider,
  TextField,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';
import { getDoc, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Navigate, useNavigate, Link } from 'react-router-dom';

const theme = createTheme();

const EditLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'underline',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'none',
  },
}));

interface ProfileData {
  name: string;
  bio: string;
  followers: number;
  following: number;
  website: string;
  imageUrl: string;
}

const Home = () => {
  const [profile, setProfile] = useState<ProfileData | null>({
    name: '',
    bio: '',
    followers: 0,
    following: 0,
    website: '',
    imageUrl: '',
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const auth = getAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        const profileDocRef = doc(db, 'profiles', userId);

        const unsubscribeProfile = onSnapshot(profileDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const profileData = docSnapshot.data() as ProfileData;
            setProfile(profileData);
          } else {
            console.log('Profile document does not exist.');
            setProfile(null);
          }
        });

        return () => {
          unsubscribeProfile();
        };
      } else {
        console.log('User is not logged in.');
        setProfile(null);
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  const handleCreateProfile = async (userId: string) => {
    const initialProfileData: ProfileData = {
      name: '',
      bio: '',
      followers: 0,
      following: 0,
      website: '',
      imageUrl: '',
    };

    try {
      await setDoc(doc(db, 'profiles', userId), initialProfileData);
      console.log('Profile document created.');
      setProfile(initialProfileData);
    } catch (error) {
      console.error('Error creating profile document: ', error);
    }
  };

  if (!profile) {
    return null;
  }

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        setProfile((prevProfile: ProfileData | null) => ({
          ...(prevProfile as ProfileData),
          imageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userId = auth.currentUser?.uid;
      if (userId) {
        await setDoc(doc(db, 'profiles', userId), profile);
        console.log('Profile document saved.');
      }
    } catch (error) {
      console.error('Error saving profile document: ', error);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prevProfile: ProfileData | null) => ({
      ...(prevProfile as ProfileData),
      name: e.target.value,
    }));
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prevProfile: ProfileData | null) => ({
      ...(prevProfile as ProfileData),
      bio: e.target.value,
    }));
  };

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prevProfile: ProfileData | null) => ({
      ...(prevProfile as ProfileData),
      website: e.target.value,
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: '#f7f7f7', padding: '20px' }}>
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <Avatar
                alt="imageUrl"
                src={profile.imageUrl}
                sx={{ width: 200, height: 200 }}
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              <Button variant="outlined" onClick={() => fileInputRef.current?.click()}>
                Select Image
              </Button>
              {imagePreview && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption">Image Preview:</Typography>
                  <img src={imagePreview} alt="Preview" style={{ width: '100%', marginTop: '4px' }} />
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={9}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {profile.name}
                </Typography>
                <EditLink to="/edit-profile" onClick={handleEditProfile}>
                  Edit Profile
                </EditLink>
              </Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {profile.bio}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {profile.followers} Followers &middot; {profile.following} Following
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {profile.website}
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={profile.name}
                  onChange={handleNameChange}
                />
                <TextField
                  label="Bio"
                  variant="outlined"
                  fullWidth
                  value={profile.bio}
                  onChange={handleBioChange}
                />
                <TextField
                  label="Website"
                  variant="outlined"
                  fullWidth
                  value={profile.website}
                  onChange={handleWebsiteChange}
                />
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
