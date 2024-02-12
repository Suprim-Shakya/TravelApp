import React from 'react';
import { View, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
        <ImageBackground
            source={require('../../assets/onboardImage.jpg')}
            style={styles.image}
            // fadeDuration={500}
        >
            <View style={styles.loading}>

      <ActivityIndicator size="large" color="#fff" />
            </View>
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    ...StyleSheet.absoluteFillObject, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    backgroundColor: "rgba(0,0,0,0.9)",
    padding: 5,
    borderRadius: 10,
  }
});

export default LoadingScreen;
