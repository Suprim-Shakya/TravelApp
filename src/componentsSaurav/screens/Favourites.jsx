import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FavouritesScreen = () => {
 const [favourites, setFavourites] = useState([]);

 const handleAddToFavourites = (item) => {
    setFavourites((prevFavourites) => [...prevFavourites, item]);
 };

 const handleRemoveFromFavourites = (index) => {
    const newFavourites = [...favourites];
    newFavourites.splice(index, 1);
    setFavourites(newFavourites);
 };

 const FavouriteItem = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.item}>{item}</Text>
    </TouchableOpacity>
 );

 return (
    <View style={styles.container}>
      {favourites.map((item, index) => (
        <FavouriteItem key={index} item={item} onPress={() => handleRemoveFromFavourites(index)} />
      ))}
      <TouchableOpacity onPress={() => handleAddToFavourites('New Favourite')}>
        <Text style={styles.addButton}>Add to Favourites</Text>
      </TouchableOpacity>
    </View>
 );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 },
 item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
 },
 addButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    color: '#fff',
 },
});

export default FavouritesScreen;