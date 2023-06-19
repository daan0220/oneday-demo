import React, { ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Box, Grid, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchFormProps {
  searchQuery: string;
  onSearchInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchQuery,
  onSearchInputChange,
  onSearchSubmit,
}) => {
  return (
    <form onSubmit={onSearchSubmit}>
      <Grid container alignItems="center" justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3}>
            <Box p={2} display="flex" alignItems="center">
              <TextField
                fullWidth
                type="text"
                value={searchQuery}
                onChange={onSearchInputChange}
                placeholder="キーワードを入力してください"
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ ml: 2, backgroundColor: '#FF4081', color: 'white' }}
              >
                <SearchIcon />
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchForm;
