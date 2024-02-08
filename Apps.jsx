import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';

const data = [
  { id: '1', title: 'New York' },
  { id: '2', title: 'Los Angeles' },
  { id: '3', title: 'Chicago' },
  { id: '4', title: 'Houston' },
  { id: '5', title: 'Phoenix' },
  { id: '6', title: 'Philadelphia' },
  { id: '7', title: 'San Antonio' },
  { id: '8', title: 'San Diego' },
  { id: '9', title: 'Dallas' },
  { id: '10', title: 'San Jose' },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const searchFilterFunction = (text) => {
    setSearchQuery(text);
    setFilteredData(
      data.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Basic FlatList Example</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        onChangeText={searchFilterFunction}
        value={searchQuery}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: black,
    marginTop: 60,
    fontWeight: '700',
  },
  listItem: {
    marginTop: 10,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
  },
  listItemText: {
    fontSize: 18,
  },
  searchBar: {
    marginTop: 20,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});
