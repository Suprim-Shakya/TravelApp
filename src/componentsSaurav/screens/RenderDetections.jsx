import { View, Text, Image } from 'react-native'
import React from 'react'

import { ScrollView } from 'react-native-gesture-handler'

import DetectionCard from '../customComponents/DetectionCard'


const RenderDetections = ({ route }) => {

	// const route = useRoute();  this also valid
	const { detections, imageURL, numberOfDetection } = route.params
	console.log(detections, imageURL, numberOfDetection)
	// const detectionData = route.params;

	return (
		<ScrollView >

			{
				detections.length ? (
					detections.map((detection, index) => (
						<DetectionCard key={index} {...detection} />
					))
				) : (<View>
					<Text style={{ fontSize: 15, color: 'black', textAlign: 'center', justifyContent: 'center' }}>No sites are found.</Text>
				</View>
				)
			}


		</ScrollView>
	)
}

export default RenderDetections

//TODO: the skeletion logic also works here ,, but result is not given till recieved from server so now visible, if we can handle server here then skeleton will be visible