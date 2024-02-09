import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
import COLORS from './src/constants/colors';

const data = [
  { id: '1', title: 'Akash Bhairab Temple' },
  { id: '2', title: 'Bhagwati Temple' },
  { id: '3', title: 'Bhuvaneshwor Mahadev Temple' },
  { id: '4', title: 'Chasin Dega Temple' },
  { id: '5', title: 'Degu Talle Temple' },
  { id: '6', title: 'Dhansa Temple' },
  { id: '7', title: 'Gaddi Baithak' },
  { id: '8', title: 'Gopinath Temple' },
  { id: '9', title: 'Gorakhnath Shrine' },
  { id: '10', title: 'Hanuman Temple' },
  { id: '11', title: 'Jagannath Temple' },
  { id: '12', title: 'Kageshwor Mahadev Temple' },
  { id: '13', title: 'Kasthamandap' },
  { id: '14', title: 'Kotilingeshwar Mahadev Temple' },
  { id: '15', title: 'Kumari Ghar' },
  { id: '16', title: 'Lalitpur Bhawan' },
  { id: '17', title: 'Mahadev temple' },
  { id: '18', title: 'Mahadev Chaitya' },
  { id: '19', title: 'Mahendreshwor Mahadev Temple' },
  { id: '20', title: 'Maju Dega' },
  { id: '21', title: 'Nau Talle Durbar' },
  { id: '22', title: 'Newroad Juddha Salik' },
  { id: '23', title: 'Shivalinga Temple' },
  { id: '24', title: 'Shree Kal Bhairab' },
  { id: '25', title: 'Shree Mahalaxmi Temple' },
  { id: '26', title: 'Silyan Sata House' },
  { id: '27', title: 'Statue At Entrance' },
  { id: '28', title: 'Swet Bhairab' },
  { id: '29', title: 'Taga Gan Bell' },
  { id: '30', title: 'Taleju Bhawani Temple' },
  { id: '31', title: 'Trrailokya Mohan Narayan Temple' },
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
      {/* <Text style={styles.text}>Search Implementation</Text> */}
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
    color: '#000',
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
    color: COLORS.dark,
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
