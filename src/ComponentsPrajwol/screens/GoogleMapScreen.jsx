// import React, { useState } from 'react';
// import { View, TouchableOpacity, Text, TextInput } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import openMap from 'react-native-open-maps';
/*
const App = () => {
  const sourceLatitude = 27.6882799;
  const sourceLongitude = 85.3273862;
  const destinationLatitude = 27.672704;
  const destinationLongitude = 85.3118294;

  const [source, setSource] = useState(`${sourceLatitude}, ${sourceLongitude}`);
  const [destination, setDestination] = useState(`${destinationLatitude}, ${destinationLongitude}`);

  const handleSearchRestaurants = () => {
    openMap({
      query: 'restaurants',
      zoom: 15,
      latitude: sourceLatitude,
      longitude: sourceLongitude,
    });
  };

  const handleShowRoute = () => {
    const routeData = [
      { latitude: sourceLatitude, longitude: sourceLongitude },
      { latitude: destinationLatitude, longitude: destinationLongitude },
    ];

    openMap({
      travelType: 'drive',
      start: source,
      end: destination,
      // waypoints:[{latitude: 27.70479649, longitude: 85.30710951}, {latitude: 27.70422655, longitude: 85.30675981}],
    //   waypoints:[{"latitude": 27.70479649, "longitude": 85.30710951}, {"latitude": 27.70422655, "longitude": 85.30675981}],
      waypoints:["Kalimati","Balkhu","Ekantakuna"],
    //   waypoints:["Labim Mall","Sundhara"],
      optimizeWaypoints:true,
      travelMode: 'driving',
      navigate_mode: 'navigate',
      region: routeData,
    });
  };
    

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: sourceLatitude,
          longitude: sourceLongitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: sourceLatitude, longitude: sourceLongitude }}
          title="Source Location"
        />
        <Marker
          coordinate={{ latitude: destinationLatitude, longitude: destinationLongitude }}
          title="Destination Location"
        />
      </MapView>

      <View style={{ position: 'absolute', bottom: 16, left: 16, padding: 10, backgroundColor: 'blue', borderRadius: 8 }}>
        <Text style={{ color: 'white' }}>Enter Source & Destination</Text>

        <Text>Source:</Text>
        <TextInput
          placeholder="Enter source coordinates (latitude, longitude)"
          value={source}
          onChangeText={setSource}
          style={{ borderWidth: 1, marginBottom: 16, padding: 8, backgroundColor: 'white' }}
        />

        <Text>Destination:</Text>
        <TextInput
          placeholder="Enter destination coordinates (latitude, longitude)"
          value={destination}
          onChangeText={setDestination}
          style={{ borderWidth: 1, marginBottom: 16, padding: 8, backgroundColor: 'white' }}
        />

        <TouchableOpacity onPress={handleShowRoute} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 8 }}>
          <Text style={{ color: 'white' }}>Show Route</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{ position: 'absolute', bottom: 16, right: 16, padding: 10, backgroundColor: 'blue', borderRadius: 8 }}
        onPress={handleSearchRestaurants}
      >
        <Text style={{ color: 'white' }}>Search Restaurants</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
*/
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';
import { MAPS_API_KEY } from '../../componentsSaurav/config';

const GoogleMapsButton = () => {
  const openGoogleMapsDirections = async () => {
    const origin = 'Tinkune';
    const destination = 'Baneshwor chowk';
    const waypoints = ['Balkhu'];

    // Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key
    const apiKey = MAPS_API_KEY;
    const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypoints.join(
      '|'
    )}&optimize=true&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status !== 'OK') {
        throw new Error(`Google Maps API error! Status: ${data.status}`);
      }

      if (!data.routes || data.routes.length === 0) {
        throw new Error('No routes found.');
      }

      const optimizedWaypoints =
        data.routes[0].waypoint_order?.map(index => waypoints[index]) || [];

      const mapsDeepLink = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${optimizedWaypoints.join(
        '|'
      )}`;

      // Open the directions in the Google Maps app using Linking
      Linking.openURL(mapsDeepLink);
    } catch (error) {
      console.error('Error fetching directions:', error.message);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={openGoogleMapsDirections}>
      <Text style={styles.buttonText}>Open Google Maps</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GoogleMapsButton;


