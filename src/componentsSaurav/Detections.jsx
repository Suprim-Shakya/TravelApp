import { View, Text, Pressable, StyleSheet, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import DetectionCard from './detectionActions/DetectionCard'
import openGallery from './actions/openGallery'
import openCamera from './actions/openCamera'
import sendImageToServer from './actions/sendImageToServer'

const Detections = ({ route }) => {
	const navigation = useNavigation();
	const { initiator } = route.params;
	const [detections, setDetections] = useState([]);

	const [dataReceived, setDataReceived] = useState(false);

	console.log('---------------------------------------------1')
	useEffect(() => {
		const fetchData = async () => {
			try {
				let formData;
				if (initiator === 'gallery') {
					formData = await openGallery();
					console.log('gallery complete')
				} else if (initiator === 'camera') {
					formData = await openCamera();
					console.log('camera complete')
				}

				if (formData !== 'cancel') {
					const { imageURL, numberOfDetection, detections } = await sendImageToServer(formData);
					if (Array.isArray(detections)) {
						setDetections(detections);
						setDataReceived(true);
					} else {
						console.error('Invalid format for detections:', detections);
						setDetections([]);
						setDataReceived(true);
					}
				} else {
					navigation.navigate('Home');
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, [initiator]);

	return (
		<ScrollView>
			{console.log('---------------------------------------------c')}
			{dataReceived ? (
				detections.length ? (
					detections.map((detection, index) => <DetectionCard key={index} {...detection} />)
				) : (
					<Text style={{ fontSize: 30, color: 'black', textAlign: 'center' }}>No sites are found.</Text>
				)
			) : (
				<Text>Loading...</Text>
			)}
		</ScrollView>
	);
};


export default Detections