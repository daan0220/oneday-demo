import React, { useEffect, useState } from 'react';
import { Typography, Box, Paper, createTheme, ThemeProvider, AppBar, Toolbar, IconButton, Badge } from '@mui/material';
import { styled } from '@mui/system';
import { getDoc, doc, setDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Navigate, useNavigate, Link, Outlet } from 'react-router-dom';
import { Button } from '@mui/material';
import { MoreHoriz as MoreHorizIcon, Favorite as FavoriteIcon, Notifications as NotificationsIcon, Search as SearchIcon } from '@mui/icons-material';
import AvatarSection from './AvatarSection';
import ProfilePostsSection from './ProfilePostsSection';
import AppHeader from './AppHeader';

const theme = createTheme({
  palette: {
    background: {
      default: '#E0F7FA', // 背景色を水色に設定
    },
  },
});

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
  posts: Post[];
}

interface Post {
  studyTheme: string;
  additionalText: string;
  timestamp: any; // 適切なタイムスタンプの型に置き換えてください
  likes: number; // いいねの数を表すプロパティを追加
}

const Home = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        const profileDocRef = doc(db, 'profiles', userId);

        const unsubscribeProfile = onSnapshot(profileDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const profileData = docSnapshot.data() as ProfileData;
            setProfile(profileData);
            navigate('/main');
          } else {
            console.log('Profile document does not exist.');
            setProfile(null);
            navigate('/home');
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
      posts: [],
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

  const handleEditPost = async (index: number, updatedPost: string) => {
    const updatedPosts = [...profile!.posts];
    const post = updatedPosts[index];
    post.additionalText = updatedPost;
    setProfile({ ...profile!, posts: updatedPosts });
  
    // Firestore上のデータを更新
    const userId = auth.currentUser!.uid;
    const profileDocRef = doc(db, 'profiles', userId);
    try {
      await updateDoc(profileDocRef, { posts: updatedPosts });
      console.log('Post updated in Firestore.');
    } catch (error) {
      console.error('Error updating post in Firestore: ', error);
    }
  };
  
  const handleLikePost = async (index: number) => {
    const updatedPosts = [...profile!.posts];
    const post = updatedPosts[index];

    if (post.likes % 2 === 0) {
      // ユーザーがまだいいねしていない場合は、いいねを増やす
      post.likes += 1;
    } else {
      // ユーザーが既にいいねしている場合は、いいねを取り消す
      post.likes -= 1;
    }

    setProfile({ ...profile!, posts: updatedPosts });

    const userId = auth.currentUser!.uid;
    const profileDocRef = doc(db, 'profiles', userId);
    try {
      await updateDoc(profileDocRef, { posts: updatedPosts });
      console.log('Post liked and updated in Firestore.');
    } catch (error) {
      console.error('Error updating post in Firestore: ', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'background.default', padding: '20px' }}>
        <AppHeader sx={{ backgroundColor: '#80DEEA' }} />
        <Paper sx={{ p: 2 }}>
          <AvatarSection
            imageUrl={profile.imageUrl}
            name={profile.name}
            bio={profile.bio}
            followers={profile.followers}
            following={profile.following}
            website={profile.website}
            handleEditProfile={handleEditProfile}
          />
        </Paper>

        <ProfilePostsSection
          posts={profile.posts}
          handleEditPost={handleEditPost}
          handleLikePost={handleLikePost}
        />
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

export default Home;
