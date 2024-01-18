import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import SearchPlaces from './SearchPlaces';
import { MAPS_API_KEY } from '../../componentsSaurav/config';
import MapViewDirections from 'react-native-maps-directions';

const Maps = () => {

	const [mLat, setMLat] = useState(0);
	const [mLong, setMLong] = useState(0);
	const [selectedCoordinates, setSelectedCoordinates] = useState(null);
	const [originCoordinates, setOriginCoordinates] = useState(null);
	const [destination, setDestination] = useState(null);
	const [duration, setDuration] = useState(null);

	useEffect(() => {
		requestLocationPermission();
		getMyLocation();

		const watchId = Geolocation.watchPosition(
			(position) => {
				setMLat(position.coords.latitude);
				setMLong(position.coords.longitude);

				console.log('My Latitude:', position.coords.latitude);
				console.log('My Longitude:', position.coords.longitude);
			},
			(error) => {
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, interval: 5000, distanceFilter: 10 }
		);

		return () => {
			Geolocation.clearWatch(watchId);
		};
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

	const getMyLocation = () => {
		Geolocation.getCurrentPosition(
			(position) => {
				setMLat(position.coords.latitude);
				setMLong(position.coords.longitude);

				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;

				console.log('My Latitude 1:', latitude);
				console.log('My Longitude 1:', longitude);
			},
			(error) => {
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
		);
	};

	const handlePlaceSelected = (selCoordinates) => {
		setSelectedCoordinates(selCoordinates);

		const destLatitude = selCoordinates.lat;
		const destLongitude = selCoordinates.lng;

		setDestination({
			latitude: selCoordinates.lat,
			longitude: selCoordinates.lng,
		});
	};

	const onDirectionReady = (result) => {
		setDuration(result.duration);

		console.log('Distance: ', result.distance);
		console.log('Duration: ', result.duration);
		// console.log('Fare: ', result.fare);
	};

	const formatDuration = (durationInSeconds) => {
		const minutes = Math.floor(durationInSeconds / 60);
		const seconds = durationInSeconds % 60;
		return `${minutes} min ${seconds} sec`;
	};

	const waypoints = [
		{ latitude: 27.671980, longitude: 85.312469 },
		// Add more waypoints as needed
	];
	return (
		<View style={{ flex: 1 }}>
			<SearchPlaces onPlaceSelected={handlePlaceSelected} />

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
				<Marker coordinate={{ latitude: mLat, longitude: mLong }} />

				{selectedCoordinates && (
					<Marker
						coordinate={{
							latitude: 27.671980, longitude: 85.312469
						}}
					/>
				)}
				{selectedCoordinates && (
					<Marker
						coordinate={{
							latitude: selectedCoordinates.lat,
							longitude: selectedCoordinates.lng,
						}}
					/>
				)}

				{destination && waypoints && (
					<MapViewDirections
						origin={{ latitude: mLat, longitude: mLong }}
						waypoints={waypoints}
						optimizeWaypoints={true}
						destination={destination}
						apikey={MAPS_API_KEY}
						// strokeWidth={3}
						strokeColor="black"
						onReady={onDirectionReady}
					/>
				)}
			</MapView>

			{/* <TouchableOpacity
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
      </TouchableOpacity> */}
		</View>
	);
};

export default Maps;


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
