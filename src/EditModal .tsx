import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from './firebase';

interface Post {
  studyTheme: string;
  additionalText: string;
  timestamp: any; // 適切なタイムスタンプの型に置き換えてください
}

interface ProfileData {
  name: string;
  bio: string;
  followers: number;
  following: number;
  website: string;
  imageUrl: string;
  posts: Post[];
}

interface EditModalProps {
  showModal: boolean;
  handleModalClose: () => void;
  studyTheme: string;
  setStudyTheme: React.Dispatch<React.SetStateAction<string>>;
  additionalText: string;
  setAdditionalText: React.Dispatch<React.SetStateAction<string>>;
  handlePost: () => void; // 新しく追加するプロパティ
}

const EditModal: React.FC<EditModalProps> = ({
  showModal,
  handleModalClose,
  studyTheme,
  setStudyTheme,
  additionalText,
  setAdditionalText,
  handlePost,
}) => {
  const auth = getAuth();

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudyTheme(e.target.value);
  };

  const handleAdditionalTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdditionalText(e.target.value);
  };

  const handleSavePost = async () => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const profileDocRef = doc(db, 'profiles', userId);

      try {
        const profileDocSnapshot = await getDoc(profileDocRef);
        if (profileDocSnapshot.exists()) {
          const profileData = profileDocSnapshot.data() as ProfileData;

          const newPost: Post = {
            studyTheme,
            additionalText,
            timestamp: new Date() // JavaScript の Date オブジェクトを使ってタイムスタンプを作成
          };

          await updateDoc(profileDocRef, {
            posts: arrayUnion(newPost) // arrayUnion メソッドを使用して配列に新しい要素を追加
          });

          console.log('Post saved successfully!');
          handlePost(); // handlePostを呼び出すように修正
        } else {
          console.log('Profile document does not exist.');
        }
      } catch (error) {
        console.error('Error adding post to profile document: ', error);
      }
    } else {
      console.log('User is not logged in.');
    }
  };

  return (
    <Modal open={showModal} onClose={handleModalClose}>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="white">
        <div>
          <Typography variant="h5" component="h2" gutterBottom>
            Edit Study Theme
          </Typography>
          <TextField
            id="study-theme-input"
            label="Study Theme"
            value={studyTheme}
            onChange={handleThemeChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="additional-text-input"
            label="Additional Text"
            value={additionalText}
            onChange={handleAdditionalTextChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button onClick={handleSavePost} variant="contained" color="primary" fullWidth>
            POST
          </Button>
          <Button onClick={handleModalClose} variant="outlined" color="secondary" fullWidth>
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default EditModal;
