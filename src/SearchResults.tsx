import React from 'react';
import { Box, Typography, Grid, Paper, Avatar } from '@mui/material';

interface SearchResult {
  id: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  website: string;
  imageUrl: string;
}

interface SearchResultsProps {
  results: SearchResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <Box mt={2}>
      {results.length > 0 ? (
        <Grid container spacing={2}>
          {results.map((result) => (
            <Grid key={result.id} item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ height: '100%' }}>
                <Box p={2} height="100%" display="flex" flexDirection="column" justifyContent="space-between">
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={3}>
                      <Avatar alt={result.name} src={result.imageUrl} sx={{ width: 200, height: 200 }} />
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h4" sx={{ mb: 1 }}>
                          {result.name}
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {result.bio}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {result.followers} Followers &middot; {result.following} Following
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {result.website}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">検索結果はありません。</Typography>
      )}
    </Box>
  );
};

export default SearchResults;
