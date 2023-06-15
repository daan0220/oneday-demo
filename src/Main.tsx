import React, { useEffect, useState } from 'react';
import { Typography, Avatar, Box, Grid, Paper, createTheme, ThemeProvider } from '@mui/material';
import { styled } from '@mui/system';
import { getDoc, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Navigate, useNavigate, Link, Outlet } from "react-router-dom";
import TimerScreen from './TimerScreen';
import { Button } from '@mui/material'; // Buttonを@mui/materialからインポートする




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
  // profilePictureUrl: string;
  imageUrl: string;
}

const Home = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid; // ログインユーザーのUIDを取得
        const profileDocRef = doc(db, 'profiles', userId);
  
        const unsubscribeProfile = onSnapshot(profileDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const profileData = docSnapshot.data() as ProfileData;
            setProfile(profileData);
            navigate("/main"); // プロフィールが設定されている場合は直接 "/main" に遷移
          } else {
            console.log('Profile document does not exist.');
            setProfile(null); // ドキュメントが存在しない場合はnullを設定する
            navigate("/home"); // プロフィールが設定されていない場合は "/home" に遷移
          }
        });
        
        return () => {
          unsubscribeProfile();
        };
      } else {
        console.log('User is not logged in.');
        setProfile(null); // ユーザーがログインしていない場合もnullを設定する
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
      // profilePictureUrl: '',
      imageUrl: ''
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
    return null; // プロフィールが読み込まれるまで何も表示しない
  }

  const handleEditProfile = () => {
    navigate("/edit-profile"); // プロフィール編集ページに遷移
  };

  const { name, bio, followers, following, website, imageUrl } = profile;

  // プロフィールが存在する場合の処理
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: '#f7f7f7', padding: '20px' }}>
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <Avatar alt="imageUrl" src={imageUrl} sx={{ width: 200, height: 200 }} />
            </Grid>
            <Grid item xs={12} md={9}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {name}
                </Typography>
                <EditLink to="/edit-profile" onClick={handleEditProfile}>Edit Profile</EditLink>
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
        </Paper>
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

export default Home;
