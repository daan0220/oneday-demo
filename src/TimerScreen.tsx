import React, { useState, useEffect } from 'react';
import { Button, Typography, TextField, Modal, Box, Slider } from '@mui/material';

const TimerScreen = () => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [studyTheme, setStudyTheme] = useState('');
  const [themeSubmitted, setThemeSubmitted] = useState(false);
  const [minutes, setMinutes] = useState(15);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleStartTimer = () => {
    if (studyTheme.trim() === '') {
      alert('Please enter a study theme before starting the timer.');
      return;
    } else if (studyTheme.length < 10) {
      alert('Please enter a study theme with at least 10 characters.');
      return;
    }

    setIsRunning(true);
    setTimer(minutes * 60); // 分数を秒数に変換して設定
    setThemeSubmitted(true);
  };

  const handleStopTimer = () => {
    setIsRunning(false);
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudyTheme(e.target.value);
  };

  const handleMinutesChange = (event: Event, value: number | number[]) => {
    const minutes = Array.isArray(value) ? value[0] : value;
    setMinutes(minutes);
  };
  

  const handlePostConfirmation = () => {
    setShowConfirmation(false);
    setShowModal(true);
  };

  const handlePostCancel = () => {
    setShowConfirmation(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handlePost = () => {
    // 投稿処理を実行する
    // バックエンドのAPIを呼び出したり、ライブラリを使用したりするなどの方法で実装する
    alert('Study theme posted!');
    setShowModal(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      clearInterval(interval);
      setIsRunning(false);
      if (themeSubmitted) {
        setShowConfirmation(true);
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timer, themeSubmitted]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <div>
        {themeSubmitted ? (
          <Typography variant="h6" gutterBottom>
            Study Theme: {studyTheme}
          </Typography>
        ) : (
          <TextField
            label="Enter your study theme"
            variant="outlined"
            fullWidth
            value={studyTheme}
            onChange={handleThemeChange}
            sx={{ marginBottom: '1rem' }}
          />
        )}

        {!isRunning && (
          <div>
            <Typography variant="h6" gutterBottom>
              Set minutes (15 minutes or more)
            </Typography>
            <Slider
              value={minutes}
              onChange={handleMinutesChange}
              min={15}
              step={1}
              marks
              valueLabelDisplay="auto"
            />
            <Button variant="contained" color="primary" onClick={handleStartTimer}>
              Start Timer
            </Button>
          </div>
        )}

        {isRunning && (
          <Typography variant="h4" gutterBottom>
            Timer: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' + (timer % 60) : timer % 60}
          </Typography>
        )}

        {isRunning && (
          <Button variant="contained" color="secondary" onClick={handleStopTimer}>
            Stop Timer
          </Button>
        )}

        <Modal open={showConfirmation} onClose={handlePostCancel}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="rgba(0, 0, 0, 0.5)"
          >
            <div>
              <Typography variant="h6" gutterBottom align="center">
                This is your study theme: {studyTheme}
              </Typography>
              <Typography variant="h6" gutterBottom align="center">
                Do you want to post this achievement?
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center" marginTop="1rem">
                <Button variant="contained" color="primary" onClick={handlePostConfirmation} sx={{ marginRight: '1rem' }}>
                  Yes
                </Button>
                <Button variant="contained" color="secondary" onClick={handlePostCancel}>
                  No
                </Button>
              </Box>
            </div>
          </Box>
        </Modal>

        <Modal open={showModal} onClose={handleModalClose}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="rgba(0, 0, 0, 0.5)"
          >
            <div>
              <Typography variant="h6" gutterBottom align="center">
                Post your study theme:
              </Typography>
              <TextField
                label="Study theme"
                variant="outlined"
                fullWidth
                value={studyTheme}
                disabled
                sx={{ marginBottom: '1rem' }}
              />
              <Box display="flex" justifyContent="center" alignItems="center" marginTop="1rem">
                <Button variant="contained" color="primary" onClick={handlePost} sx={{ marginRight: '1rem' }}>
                  Post
                </Button>
                <Button variant="contained" color="secondary" onClick={handleModalClose}>
                  Cancel
                </Button>
              </Box>
            </div>
          </Box>
        </Modal>
      </div>
    </Box>
  );
};

export default TimerScreen;
