
import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import SearchPlaces from './SearchPlaces';

const App = () => {
  //mylatitude
  const [mLat, setMLat] = useState(0);
  const [mLong, setMLong] = useState(0);

  

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
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
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };


  const getMyLocation=()=>{
    Geolocation.getCurrentPosition(
      (position) => {
        // console.log(position);
        setMLat(position.coords.latitude);
        setMLong(position.coords.longitude);

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log(' My Latitude:', latitude);
        console.log('My Longitude:', longitude);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
  }

  const getLocation = (coordinates) => {
    setMLat(coordinates.latitude);
    setMLong(coordinates.longitude);
  };

  // const [markersList, setMarkersList] = useState([
  //   {
  //   id:1,
  //   latitude: {mLat},
  //   longitude: {mLong},
  //   title: 'Team A',
  //   description: 'This is my current location'
  //   },
  //   {
  //   id:2,
  //   latitude: 27.6182642,
  //   longitude: 85.3973677,
  //   title: 'Team B',
  //   description: 'This is my current location'
  //   }
  //   ])

  return (
    <View style={{ flex: 1 }}>
      {/* Render the SearchPlaces component on the main app screen */}
      <SearchPlaces onPlaceSelected={getLocation} />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 27.688055,
          longitude: 85.327595,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChange={(region) => {
          // console.log(region);
        }}
      >
        {/* {
            markersList.map((marker)=>{
              return(
                <Marker
                coordinate={{latitude:marker.latitude,longitude:marker.longitude}}
                title={Marker.title}
                />
              )
            })
        } */}
      <Marker coordinate={{ latitude: mLat, longitude: mLong }} />
      </MapView>

      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          alignSelf: 'center',
          position: 'absolute',
          bottom: 20,
          backgroundColor: '#04555c',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          getMyLocation();
        }}
      >
        <Text style={{ color: '#fff' }}>Get Current Location</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

// import React, { useEffect, useState } from 'react';
// import { View, Text } from 'react-native';

// const App = () => {
//   const [distance, setDistance] = useState(null);

//   useEffect(() => {
//     const origin = { lat: 27.6882401, lng: 85.3273886 };
//     const destination = { lat: 27.6922589, lng: 85.3236319 };
//     const apiKey = 'AIzaSyCZhJW9pjVyLxoZu5YZ3aApWUHIRtyxJrc'; // Replace with your actual API key

//     const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=${apiKey}`;

//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         // Extracting relevant information
//         const distanceText = data.rows[0].elements[0].distance.text;
//         const distanceValue = data.rows[0].elements[0].distance.value;
//         const durationText = data.rows[0].elements[0].duration.text;
//         const durationValue = data.rows[0].elements[0].duration.value;

//         // Displaying the information
//         setDistance({ distanceText, distanceValue, durationText,durationValue });
//       })
//       .catch((error) => console.error('Error fetching distance matrix:', error));
//   }, []);

//   return (
//     <View>
//       <Text>Distance Text: {distance?.distanceText}</Text>
//       <Text>Distance Value: {distance?.distanceValue}</Text>
//       <Text>Duration Text: {distance?.durationText}</Text>
//       <Text>Duration Value: {distance?.durationValue}</Text>
//     </View>
//   );
// };

// export default App;
