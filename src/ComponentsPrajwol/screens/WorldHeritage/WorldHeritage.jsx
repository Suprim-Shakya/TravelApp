import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fetchWH from './fetchWH';

const WorldHeritage = () => {
  const [worldheritageDetails, setWorldheritageDetails] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const worldheritageResponse = await fetchWH();
        setWorldheritageDetails(worldheritageResponse);
      } catch (error) {
        console.error('Error fetching user contributions:', error);
      }
    };

    fetchData();
  }, []);

  const navigateToWorldHeritageDetails = (item) => {
    // navigation.navigate('DetailsScreen', { worldheritageResponse: item });
    console.log('Pressed', item.className);
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.cardWh}
      onPress={() => navigateToWorldHeritageDetails(item)}
    >
      <Image source={{ uri: item.imageLink }} style={styles.imagewh} />
      <Text style={styles.nameWh}>{item.className}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.containerWh}>
      {worldheritageDetails && worldheritageDetails.documents && (
        <FlatList
          data={worldheritageDetails.documents}
          keyExtractor={(item) => item.classNumber.toString()}
          renderItem={renderCard}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerWh: {
    flexDirection: 'row',
  },
  cardWh: {
    width: 150,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 10,
    alignItems: 'center',
  },
  imagewh: {
    width: 120,
    height: 90,
    borderRadius: 8,
    marginBottom: 10,
  },
  nameWh: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WorldHeritage;
