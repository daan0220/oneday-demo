import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const HomePage = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleBioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBio(event.target.value);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      const imageUrl = URL.createObjectURL(selectedFile);
      setImage(imageUrl);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name.trim() !== '' && bio.trim() !== '') {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userId = user.uid;
          const profileDocRef = doc(db, 'profiles', userId);

          const profileData = {
            name,
            bio,
            imageUrl: image,
          };

          await setDoc(profileDocRef, profileData);

          console.log('Profile created/updated.');
        } else {
          console.log('User is not logged in.');
        }

        navigate('/main');
      } catch (error) {
        console.error('Error adding/updating profile: ', error);
      }
    } else {
      alert('全ての項目を入力してください');
    }
  };

  return (
    <div style={{ backgroundColor: '#f2f2f2', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Welcome to HomePage</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          style={{ marginBottom: '10px' }}
          label="Name"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
        />
        <br />
        <TextField
          style={{ marginBottom: '10px' }}
          label="Bio"
          variant="outlined"
          value={bio}
          onChange={handleBioChange}
        />
        <br />
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input
            type="file"
            id="image"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <label htmlFor="image" style={{ marginRight: '10px', cursor: 'pointer' }}>
            Choose Image
          </label>
          {image && (
            <div
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <img
                src={image}
                alt="Profile Image"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          )}
        </div>
        <br />
        <Button style={{ marginTop: '20px' }} variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default HomePage;
