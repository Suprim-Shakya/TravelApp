import { View, Text, Pressable, StyleSheet, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import DetectionCard from './detectionActions/DetectionCard'

const Detections = ({route}) => {

	const route = useRoute();
	// const { detections, imageURL, numberOfDetection } = route.params
	// const detectionData = route.params;

	const {initiator} = route.params

	if (initiator == 'gallery') {
		// open gallery which returns form data
		return 
	} else if (initiator == 'camera') {
		//open camera and returns form data
	}

	
	const detections = false
	return (
		<ScrollView>

			{
				// detections.length ? (
				detections ? (
					detections.map((detection, index) => (
						<DetectionCard key={index} {...detection} />
					))
				) : (
					<Text style={{ fontSize: 30, color: 'black', textAlign: 'center' }}>No sites are found.</Text>
				)
			}

		</ScrollView>
	)
}

export default Detections