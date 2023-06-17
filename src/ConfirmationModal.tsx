import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ConfirmationModalProps {
  showConfirmation: boolean;
  handlePostConfirmation: () => void;
  handlePostCancel: () => void;
  studyTheme: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  showConfirmation,
  handlePostConfirmation,
  handlePostCancel,
  studyTheme,
}) => {
  const navigate = useNavigate();

  const handleNoClick = () => {
    handlePostCancel();
    navigate('/main');
  };

  return (
    <Modal open={showConfirmation} onClose={handlePostCancel}>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="rgba(255, 255, 255, 0.9)">
        <div>
          <Typography variant="h5" component="h2" gutterBottom>
            Great job!!
          </Typography>
          <Typography variant="body1" gutterBottom>
            あなたの今日の成果を投稿しますか？
          </Typography>
          <Typography variant="h6" component="h3" gutterBottom>
            {studyTheme}
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
            <Button onClick={handlePostConfirmation} variant="contained" color="primary" style={{ marginRight: 8 }}>
              YES
            </Button>
            <Button onClick={handleNoClick} variant="outlined" color="secondary">
              NO
            </Button>
          </Box>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
