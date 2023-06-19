import React from 'react';
import { Typography, Box, Paper, IconButton } from '@mui/material';
import { MoreHoriz as MoreHorizIcon, Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';

interface Post {
  studyTheme: string;
  additionalText: string;
  timestamp: any;
  likes: number;
}

interface PostItemProps {
  post: Post;
  index: number;
  handleOpenEditDialog: (index: number, initialPost: string) => void;
  handleLikeClick: (index: number) => void;
}

const PostItem: React.FC<PostItemProps> = ({
  post,
  index,
  handleOpenEditDialog,
  handleLikeClick,
}) => {
  const handleOpenEdit = () => {
    handleOpenEditDialog(index, post.additionalText);
  };

  const handleLike = () => {
    handleLikeClick(index);
  };

  return (
    <Paper>
      <Box display="flex" alignItems="center" p={2}>
        <Box flexGrow={1}>
          <Typography variant="h6">{post.studyTheme}</Typography>
          <Typography variant="body1">{post.additionalText}</Typography>
          <Typography variant="caption" color="textSecondary">
            {post.timestamp.toLocaleString()}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton size="small" onClick={handleOpenEdit}>
            <MoreHorizIcon />
          </IconButton>
          <IconButton size="small" onClick={handleLike}>
            {post.likes % 2 === 0 ? <FavoriteBorderIcon /> : <FavoriteIcon color="error" />}
          </IconButton>
          <Typography variant="body2" color="textSecondary">
            {post.likes} Likes
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default PostItem;
