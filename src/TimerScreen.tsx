import React, { useState, useEffect } from 'react';
import { Button, Typography, TextField, Box, IconButton, Slider } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useNavigate } from 'react-router-dom';
import EditModal from './EditModal ';
import ConfirmationModal from './ConfirmationModal';

const TimerScreen: React.FC = () => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [studyTheme, setStudyTheme] = useState('');
  const [themeSubmitted, setThemeSubmitted] = useState(false);
  const [minutes, setMinutes] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [additionalText, setAdditionalText] = useState('');
  const navigate = useNavigate();

  const handleStartTimer = () => {
    if (studyTheme.trim() === '') {
      alert('Please enter a study theme before starting the timer.');
      return;
    } else if (studyTheme.length < 10) {
      alert('Please enter a study theme with at least 10 characters.');
      return;
    }

    setIsRunning(true);
    setTimer(minutes * 60);
    setThemeSubmitted(true);
  };

  const handleStopTimer = () => {
    setIsRunning(false);
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudyTheme(e.target.value);
  };

  const handleSliderChange = (event: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      setMinutes(value[0]);
    } else {
      setMinutes(value);
    }
  };

  const handleMinusClick = () => {
    setMinutes((prevMinutes) => Math.max(prevMinutes - 1, 1));
  };

  const handlePlusClick = () => {
    setMinutes((prevMinutes) => Math.min(prevMinutes + 1, 120));
  };

  const handlePostConfirmation = () => {
    setShowConfirmation(false);
    setShowModal(true);
    setIsRunning(false);
  };

  const handlePostCancel = () => {
    setShowConfirmation(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setIsRunning(true);
  };

  const handlePost = () => {
    setShowModal(false);
    navigate('/main');
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      if (interval) {
        clearInterval(interval);
      }
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
    <>
      {showModal && (
        <EditModal
          showModal={showModal}
          handleModalClose={handleModalClose}
          studyTheme={studyTheme}
          setStudyTheme={setStudyTheme}
          additionalText={additionalText}
          setAdditionalText={setAdditionalText}
          handlePost={handlePost}
        />
      )}

      {showConfirmation && (
        <ConfirmationModal
          showConfirmation={showConfirmation}
          handlePostConfirmation={handlePostConfirmation}
          handlePostCancel={handlePostCancel}
          studyTheme={studyTheme}
        />
      )}

      {!showModal && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <div>
            {themeSubmitted ? (
              <Typography variant="h4" component="h1" gutterBottom>
                {studyTheme}
              </Typography>
            ) : (
              <TextField
                id="study-theme-input"
                label="Enter a Study Theme"
                value={studyTheme}
                onChange={handleThemeChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            )}
            <Box display="flex" alignItems="center" justifyContent="center">
              <IconButton onClick={handleMinusClick} color="primary" aria-label="minus">
                <ArrowDownwardIcon />
              </IconButton>
              <Slider
                value={minutes}
                onChange={handleSliderChange}
                min={1}
                max={120}
                step={1}
                sx={{ width: 200 }}
              />
              <IconButton onClick={handlePlusClick} color="primary" aria-label="plus">
                <ArrowUpwardIcon />
              </IconButton>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              {isRunning ? (
                <Button onClick={handleStopTimer} variant="contained" color="secondary" sx={{ mr: 2 }}>
                  Stop
                </Button>
              ) : (
                <Button onClick={handleStartTimer} variant="contained" color="primary" sx={{ mr: 2 }}>
                  Start
                </Button>
              )}
              <Typography variant="h4" component="p">
                {Math.floor(timer / 60).toString().padStart(2, '0')}:
                {(timer % 60).toString().padStart(2, '0')}
              </Typography>
            </Box>
          </div>
        </Box>
      )}
    </>
  );
};

export default TimerScreen;
