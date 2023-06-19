import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

interface EditPostDialogProps {
  open: boolean;
  handleClose: () => void;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
}

const EditPostDialog: React.FC<EditPostDialogProps> = ({
  open,
  handleClose,
  value,
  handleChange,
  handleSave,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <TextField multiline rows={4} variant="outlined" value={value} onChange={handleChange} fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPostDialog;
