import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

interface SearchResult {
  id: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  website: string;
  imageUrl: string;
}

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchQuery(inputValue);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchProfiles();
  };

  const searchProfiles = async () => {
    try {
      const q = query(collection(db, 'profiles'), where('name', '==', searchQuery));
      const querySnapshot = await getDocs(q);

      const results: SearchResult[] = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() } as SearchResult);
      });
      setSearchResults(results);

      const encodedQuery = encodeURIComponent(searchQuery);
      navigate(`/search?query=${encodedQuery}`);
    } catch (error) {
      console.log('検索エラー:', error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    if (query) {
      setSearchQuery(query);
      searchProfiles();
    }
  }, []);

  return (
    <Container maxWidth="md">
      <Box my={4} textAlign="center">
        <SearchForm
          searchQuery={searchQuery}
          onSearchInputChange={handleSearchInputChange}
          onSearchSubmit={handleSearchSubmit}
        />
        <SearchResults results={searchResults} />
      </Box>
    </Container>
  );
};

export default SearchPage;
