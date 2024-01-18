import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

import { ScrollView } from 'react-native-gesture-handler'

import DetectionCard from '../customComponents/DetectionCard'

// import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import MyLoader from '../customComponents/DetectionLoaderSkeleton';
import COLORS from '../../constants/colors';

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
			<ScrollView style={styles.scrollView}>

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

const styles = StyleSheet.create({
	scrollView: {
		minHeight: '100%',
		backgroundColor: COLORS.background
	}
})

//TODO: the skeletion logic also works here ,, but result is not given till recieved from server so now visible, if we can handle server here then skeleton will be visible