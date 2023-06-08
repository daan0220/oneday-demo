import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [topImage, setTopImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // 数字以外の文字が含まれていないかチェック
    if (/^[0-9]*$/.test(value)) {
      alert('名前は数字以外の文字を含めることはできません');
    } else {
      setName(value);
    }
  };

  const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // 数字以外の文字が含まれている場合は空文字にする
    if (/^[0-9]*$/.test(value)) {
      setAge(value);
    } else {
      alert('年齢は半角数字のみ入力してください');
    }
  };

  const handleGenderChange = (event: ChangeEvent<{ value: unknown }>) => {
    setGender(event.target.value as string);
  };

  const handleBioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBio(event.target.value);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setTopImage(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile));
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name.trim() !== '' && age.trim() !== '' && gender !== '') {
      // 名前、年齢、性別、自己紹介文、トップ画像の登録処理を行う（Firebaseなどのバックエンドに保存するなど）

      // 登録が完了したら、成功メッセージを表示するなどの処理を行う
      navigate('/main');
    } else {
      // 必須項目が入力されていない場合はエラーメッセージを表示するなどの処理を行う
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
          label="Age"
          variant="outlined"
          value={age}
          onChange={handleAgeChange}
        />
        <br />
        <TextField
          style={{ marginBottom: '10px' }}
          select
          label="Gender"
          variant="outlined"
          value={gender}
          onChange={handleGenderChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </TextField>
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
            id="top-image"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <label htmlFor="top-image" style={{ marginRight: '10px', cursor: 'pointer' }}>
            Choose File Image
          </label>
          {previewURL && (
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
              src={previewURL}
              alt="Preview"
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
