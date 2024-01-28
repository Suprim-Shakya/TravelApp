import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import openMap from 'react-native-open-maps';

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
      waypoints:[{latitude: 27.70479649, longitude: 85.30710951}, {latitude: 27.70422655, longitude: 85.30675981}],
    //   waypoints:[{"latitude": 27.70479649, "longitude": 85.30710951}, {"latitude": 27.70422655, "longitude": 85.30675981}],
      // waypoints:["Sundhara","Labim Mall"],
    //   waypoints:["Labim Mall","Sundhara"],
    //   optimizeWaypoints={true},
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
