import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button } from '@mui/material';

const HomePage = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAge(event.target.value);
  };

  const handleGenderChange = (event: ChangeEvent<{ value: unknown }>) => {
    setGender(event.target.value as string);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 名前、年齢、性別の登録処理を行う（Firebaseなどのバックエンドに保存するなど）

    // 登録が完了したら、成功メッセージを表示するなどの処理を行う
  };

  return (
    <div style={{
      backgroundColor: '#f2f2f2',
      padding: '20px',
    }}>
      <h1 style={{
        fontSize: '24px',
        marginBottom: '10px',
      }}>Welcome to HomePage</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          style={{
            marginBottom: '10px',
          }}
          label="Name"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
        />
        <br />
        <TextField
          style={{
            marginBottom: '10px',
          }}
          label="Age"
          variant="outlined"
          value={age}
          onChange={handleAgeChange}
        />
        <br />
        <TextField
          style={{
            marginBottom: '10px',
          }}
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
        <Button
          style={{
            marginTop: '20px',
          }}
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
        
      </form>
    </div>
  );
};

export default HomePage;
