import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import {
  MoreHoriz as MoreHorizIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';

interface Post {
  studyTheme: string;
  additionalText: string;
  timestamp: any;
  likes: number;
}

interface ProfilePostsSectionProps {
  posts: Post[];
  handleEditPost: (index: number, updatedPost: string) => void;
  handleLikePost: (index: number) => void;
}

const ProfilePostsSection: React.FC<ProfilePostsSectionProps> = ({
  posts,
  handleEditPost,
  handleLikePost,
}) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editPost, setEditPost] = useState<string>('');

  const handleOpenEditDialog = (index: number, initialPost: string) => {
    setEditIndex(index);
    setEditPost(initialPost);
  };

  const handleCloseEditDialog = () => {
    setEditIndex(null);
    setEditPost('');
  };

  const handleEditPostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditPost(event.target.value);
  };

  const handleSaveEditPost = () => {
    if (editIndex !== null && editPost !== '') {
      handleEditPost(editIndex, editPost);
      handleCloseEditDialog();
    }
  };

  return (
    <Box sx={{ marginTop: '20px' }}>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <Paper key={index} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              {post.studyTheme}
            </Typography>
            <Typography variant="body1">{post.additionalText}</Typography>
            <Typography variant="caption" color="textSecondary">
              {post.timestamp.toLocaleString()}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 2,
              }}
            >
              <IconButton onClick={() => handleOpenEditDialog(index, post.additionalText)}>
                <MoreHorizIcon />
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => handleLikePost(index)}>
                  {post.likes % 2 === 0 ? <FavoriteBorderIcon /> : <FavoriteIcon color="error" />}
                </IconButton>
                <Typography variant="body2" color="textSecondary">
                  {post.likes} Likes
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))
      ) : (
        <Typography variant="body1">No posts yet.</Typography>
      )}

      <Dialog open={editIndex !== null} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            rows={4}
            variant="outlined"
            value={editPost}
            onChange={handleEditPostChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSaveEditPost}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfilePostsSection;
