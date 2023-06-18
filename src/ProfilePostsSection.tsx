import React from 'react';
import { Typography, Box, Paper, IconButton } from '@mui/material';
import { MoreHoriz as MoreHorizIcon, Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';

interface Post {
  studyTheme: string;
  additionalText: string;
  timestamp: any;
  likes: number;
}

interface ProfilePostsSectionProps {
  posts: Post[];
  handleEditPost: (index: number) => void;
  handleLikePost: (index: number) => void;
}

const ProfilePostsSection: React.FC<ProfilePostsSectionProps> = ({
  posts,
  handleEditPost,
  handleLikePost,
}) => {
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
              <IconButton onClick={() => handleEditPost(index)}>
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
    </Box>
  );
};

export default ProfilePostsSection;
