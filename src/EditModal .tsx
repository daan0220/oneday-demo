import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

interface EditModalProps {
  showModal: boolean;
  handleModalClose: () => void;
  studyTheme: string;
  setStudyTheme: React.Dispatch<React.SetStateAction<string>>;
  additionalText: string;
  setAdditionalText: React.Dispatch<React.SetStateAction<string>>;
  handlePost: () => void;
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
  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudyTheme(e.target.value);
  };

  const handleAdditionalTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdditionalText(e.target.value);
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
          <Button onClick={handlePost} variant="contained" color="primary" fullWidth>
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
