import { View, Text, Pressable, StyleSheet, Image, Alert } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

import COLORS from '../consts/colors'
import { DATABASE_ENDPOINT, MONGODB_API_KEY } from './config'


const fetchDetailsFromDb = async(classNumber) => {

	let response
	try{

		response = await fetch (DATABASE_ENDPOINT,
			{
				method: 'POST',
				cache: 'no-cache', //may break api , remove is problem occurs
				headers : {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'apiKey':MONGODB_API_KEY
				},
				body: JSON.stringify({
					'dataSource': 'Cluster0',
					'database': 'travelGuide',
					'collection': 'heritageData',
					'filter': {
						'classNumber': classNumber
					}
				})
			})
			
			if(!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const details = await response.json();
			console.log(details)
			
		}catch (error) {
			console.error('fetch failed: ', error)
			Alert.alert('fetch failed', error)
		}
	}
		
const DetectionCard = ({ name, confidence, classNumber }) => {


	const descriptions = fetchDetailsFromDb(classNumber)
	console.log(descriptions)

	return (
		<View style={styles.outer}>

			<View style={styles.card}>
				{/* FETCH descriptions and images from db */}
				<Image source={require('../assets/location1.jpg')} style={styles.img} />

				<View style={styles.cardText}>

					<Text style={styles.headingText}>{name} - {confidence}%</Text>
					<Text style={styles.description}>Name will be provided to this this component. And Image and description (30 words max) must be fetched from database.</Text>

					<View style={styles.btnContainer}>
						<Pressable
							onPress={() => Alert.alert('you really wanna know more?')}
							style={({ pressed }) => (
								{
									backgroundColor: pressed ? 'gray' : 'black',
									borderRadius: 7,
									flex: 0,
									color: 'white',
									justifyContent: 'center',
									paddingLeft: 5,
									paddingRight: 5,
									height: 30,

								}
							)}
						>
							<Text>Know More</Text>

						</Pressable>

						{/* <Pressable
    onPress={() => console.log('Pressed!')}
    style={({ pressed }) => ({
        backgroundColor: pressed ? 'blue' : 'gray',
    })}
>
    <Text>Press me</Text>
</Pressable> */}

						{/* <View style={styles.btn} ><Text >Know More</Text></View> */}
						<View style={styles.btn}><Text >Add to plan</Text></View>
						{/* <Button title='Know More' onPress={()=> Alert.alert('ohh yeah')}/>
					<Button title='Add to Plan' onPress={()=> Alert.alert('ohh yeah')}/> */}
					</View>
				</View>
			</View>
		</View>
	)
}


const styles = StyleSheet.create({
	outer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		margin: 10,
		// width:'100%',
		// backgroundColor:'red'
		minHeight: 150,
		elevation: 5,
	},
	card: {
		backgroundColor: 'white',
		borderRadius: 5,
		width: '100%',
		overflow: 'hidden',
		flex: 1,
		flexDirection: 'row',
		padding: 8,
		elevation: 3
	},
	cardText: {
		flex: 3,
		alignItems: 'center',
		width: '100%',
	},
	headingText: {
		color: 'black',
		justifyContent: 'center',
		fontWeight: 'bold',
	},
	description: {
		color: 'black',
		padding: 5,
		textAlign: 'justify'
	},
	btn: {
		backgroundColor: 'black',
		color: 'white',
		borderRadius: 7,
		flex: 0,
		justifyContent: 'center',
		paddingLeft: 5,
		paddingRight: 5,
		height: 30,
	},
	btnContainer: {
		flex: 1,
		flexGrow: 1,
		flexDirection: 'row',
		// backgroundColor: 'red',
		alignSelf: 'stretch',
		justifyContent: 'space-evenly'
	},

	img: {
		padding: 0,
		margin: 0,
		width: 100,
		height: 'auto',
		borderRadius: 7,
		// objectFit: 'contain'

	},

})

const Detections = ({ navigation }) => {

	const route = useRoute();
	const detectionData = route.params;

	return (
		<View>

			<Text style={{ backgroundColor: COLORS.primary, fontWeight: 'bold', fontSize: 25, textAlign: 'center', color: 'white', paddingBottom:3}}>Detections</Text>
			{/* <Text style={{ color: 'black' }}>{detectionData.numberOfDetection} sites were discovered</Text>

			<Text style={{ color: 'black' }}>the image url is{detectionData.imageURL}</Text>

			{console.log(detectionData)}

			{detectionData.detections.length ? <Text style={{ color: 'black' }}>There are some detections</Text> : <Text style={{ color: 'black' }}>There are no detections</Text>}
			{console.log('inside detections: ')} */}

			{
				detectionData.detections.length ?

					detectionData.detections.map((detection, index) => <DetectionCard key={index} {...detection} />)
					:
					<Text style={{ fontSize: 30, color: 'black', textAlign: 'center' }}>No sites are found.</Text>
			}

		</View>
	)
}

export default Detections