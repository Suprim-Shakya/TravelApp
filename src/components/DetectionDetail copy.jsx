import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import COLORS from '../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';

import { MAPS_API_KEY } from '../componentsSaurav/config';
import MapViewDirections from 'react-native-maps-directions';

const FinalDetailsScreen = ({ route }) => {

    const { className, architectureStyle, constructedBy, Ticket, Description, imageLink, constructionDate, latitude, longitude } = route.params;
    const [myLat, setMyLat] = useState(0);
	const [myLong, setMyLong] = useState(0);
    useEffect(() => {
		requestLocationPermission();
		// getMyLocation();

		const watchId = Geolocation.watchPosition(
			(position) => {
				setMyLat(position.coords.latitude);
				setMyLong(position.coords.longitude);

				console.log('My Latitude in details screen:', position.coords.latitude);
				console.log('My Longitude in details screen:', position.coords.longitude);
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

    
    const [distance, setDistance] = useState(null);

    useEffect(() => {
    
    const origin = { lat: myLat, lng: myLong };
    // console.log("Thsi is your origin",myLat)
    const destination = { lat: latitude, lng: longitude };
    const apiKey = MAPS_API_KEY

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=${apiKey}`;

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log('Data from API:', data);
        // Extracting relevant information
        const distanceText = data.rows[0].elements[0].distance.text;
        const distanceValue = data.rows[0].elements[0].distance.value;
        const durationText = data.rows[0].elements[0].duration.text;
        const durationValue = data.rows[0].elements[0].duration.value;

        // Displaying the information
        setDistance({ distanceText, distanceValue, durationText,durationValue });
    })
    .catch((error) => console.error('Error fetching distance matrix:', error));
    }, []);

    return (
        <ScrollView style={styles.container}>
            {/* <StatusBar translucent={true} backgroundColor="rgba(0,0,0,0.2)" /> */}
            {imageLink && <ImageBackground source={{ uri: imageLink }} style={styles.image} >
            </ImageBackground>}

            <View style={styles.headingView}>
                <Icon name="place" size={28} color={COLORS.primary} />
                <Text style={styles.headingText}>{className}</Text>
            </View>

            <View style={{ paddingHorizontal: 15 }}>
                {architectureStyle && <Text style={styles.detailText}>Architecture Style: {architectureStyle}</Text>}
                {constructedBy && <Text style={styles.detailText}>Constructed By: {constructedBy}</Text>}
                {constructionDate && <Text style={styles.detailText}>Constructed in: {constructionDate}</Text>}
                {Ticket && <Text style={styles.detailText}>Ticket: {Ticket}</Text>}
                <Text style={styles.detailText}>Distance : {distance?.distanceText} </Text>
                {/* <Text>Distance Value: {distance?.distanceValue}</Text> */}
                <Text style={styles.detailText}>Duration : {distance?.durationText} </Text>
                {/* <Text>Duration Value: {distance?.durationValue}</Text> */}
            

            
                {Description && <Text style={styles.detailText}>Description: {Description}</Text>}
                {latitude && longitude && <Text style={styles.detailText}>Location: {latitude},{longitude}</Text>}
                </View>
           
        </ScrollView>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    ScrollView: {
        paddingHorizontal: 15,
    },
    headingView: {
        margin: 10,
        flexDirection: 'row'
    },
    headingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    detailText: {
        fontSize: 17,
        color: COLORS.dark,
        paddingVertical: 4,
    },
    image: {
        height: 300,
        width: '100%',
    },
});

export default FinalDetailsScreen;
