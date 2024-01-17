import { View, Text} from 'react-native'
import React from 'react'

import { ScrollView } from 'react-native-gesture-handler'

import DetectionCard from '../customComponents/DetectionCard'

// import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import MyLoader from '../customComponents/DetectionLoaderSkeleton';

const RenderDetections = ({ route }) => {

	// const navigation = useNavigation();

	
	if (route.params.loading) {

		return (
			<MyLoader />
		)
	}

	else if (!route.params.loading) {
		const { detections, imageURL, numberOfDetection } = route.params
		console.log(detections, imageURL, numberOfDetection)


	return (
			<ScrollView >

				{
					detections.length ? (
						detections.map((detection, index) => (
								<DetectionCard key={index} {...detection} />
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



}

export default RenderDetections

//TODO: the skeletion logic also works here ,, but result is not given till recieved from server so now visible, if we can handle server here then skeleton will be visible