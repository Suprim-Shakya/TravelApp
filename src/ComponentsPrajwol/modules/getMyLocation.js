import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';

export async function getmyLocation() {
  try {
    // Request location permission
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'Give location permission',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // If permission granted, get user coordinates
      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude: latitude, longitude:longitude });
          },
          (error) => {
            reject(error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      });
    } else {
      throw new Error('Location permission denied');
    }
  } catch (error) {
    throw new Error(`Error getting location permission: ${error.message}`);
  }
}

// Example usage
async function example() {
  try {
    const userCoordinates = await getmyLocation();
    // console.log('User Coordinates:', userCoordinates);
    // Now you can use the user's coordinates as needed
  } catch (error) {
    console.error(error.message);
    // Handle the error as needed
  }
}

// Call the example function to see the result
example();
