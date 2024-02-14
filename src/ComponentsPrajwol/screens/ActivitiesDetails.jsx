import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import COLORS from '../../constants/colors';

const ActivitiesDetails = () => {
  const route = useRoute();
  const { activity } = route.params;

  const handleOpenMap = () => {
    const { coordinates, name } = activity;
    const { latitude, longitude } = coordinates.latlng;
    const mapUrl = `https://maps.google.com/?q=${latitude},${longitude}&label=${name}`;
    Linking.openURL(mapUrl).catch((err) => console.error('Error opening map:', err));
  };

  return (
    <View style={styles.container}>
      <Image source={activity.image} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{activity.name}</Text>
        <Text style={styles.details}>{activity.details}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleOpenMap}>
        <Text style={styles.buttonText}>Open In Maps</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 16,
    width: '100%',
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  details: {
    fontSize: 18,
    color: 'black',
  },
  button: {
    position: 'absolute',
    bottom: 30,
    right: 16,
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ActivitiesDetails;
