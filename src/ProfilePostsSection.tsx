import React from 'react';
import PostItem from './PostItem';
import EditPostDialog from './EditPostDialog';

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
  const [editIndex, setEditIndex] = React.useState<number | null>(null);
  const [editPost, setEditPost] = React.useState<string>('');

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
    <div>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <PostItem
            key={index}
            post={post}
            index={index}
            handleOpenEditDialog={handleOpenEditDialog}
            handleLikeClick={handleLikePost}
          />
        ))
      ) : (
        <p>No posts yet.</p>
      )}
      <EditPostDialog
        open={editIndex !== null}
        handleClose={handleCloseEditDialog}
        value={editPost}
        handleChange={handleEditPostChange}
        handleSave={handleSaveEditPost}
      />
    </div>
  );
};

export default ProfilePostsSection;
