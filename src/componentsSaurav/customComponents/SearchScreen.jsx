import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigation = useNavigation();

  const handleSearch = () => {
    // your search logic here
    navigation.navigate('SearchScreen', { query });
  };

  return (
    <TextInput
      value={query}
      onChangeText={setQuery}
      placeholder="Search heritage"
      onSubmitEditing={handleSearch}
      returnKeyType="search"
    />
  );
};

export default SearchBar;
