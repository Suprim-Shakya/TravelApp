// UserContributions.js

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fetchUserContribution from './fetchUserContribution';

const UserContributions = () => {
  const [contribDetails, setContribDetails] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await fetchUserContribution();
        setContribDetails(details);
      } catch (error) {
        console.error('Error fetching user contributions:', error);
      }
    };

    fetchData();
  }, []);

  const navigateToDetails = (item) => {
    // navigation.navigate('DetailsScreen', { details: item });
    console.log('Pressed',item);
  };

  return (
    <View>
      {contribDetails && contribDetails.documents && (
        <View>
          {contribDetails.documents.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => navigateToDetails(item)}
            >
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default UserContributions;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
