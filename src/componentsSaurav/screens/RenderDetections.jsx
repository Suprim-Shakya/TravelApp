import { View, Text, Image } from 'react-native'
import React from 'react'

import { ScrollView } from 'react-native-gesture-handler'

import DetectionCard from '../customComponents/DetectionCard'

import { CommonActions, useNavigation } from '@react-navigation/native';

const RenderDetections = ({ route }) => {

	const navigation = useNavigation();

	// const route = useRoute();  this also valid
	const { detections, imageURL, numberOfDetection } = route.params
	console.log(detections, imageURL, numberOfDetection)
	// const detectionData = route.params;

	// navigation.dispatch(
	// 	CommonActions.reset({
	// 		index: 0,
	// 		routes: [
	// 			{ name: 'ScanScreenStack', params:{screen: 'RenderDescription'} },
	// 			// { name: 'Home' }
	// 		]
	// 	})
	// )

	// navigation.reset({
	// 	index: 0,
	// 	routes: [{name:'RenderDetections'},{name: 'Home'}]
	// });

	//TODO: prevent going back from detectoins to loading, may be acheived by showing loading screen from detection component.


	return (
		<ScrollView >

			{
				detections.length ? (
					detections.map((detection, index) => (
						<View>
							<DetectionCard key={index} {...detection} />
						</View>
					)
					)
				) : (<View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: 800 }}>

					<Text style={{ fontSize: 20, color: 'black' }}>No sites are found.</Text>

				</View>
				)
			}


		</ScrollView>
	)
}

export default RenderDetections

//TODO: the skeletion logic also works here ,, but result is not given till recieved from server so now visible, if we can handle server here then skeleton will be visible