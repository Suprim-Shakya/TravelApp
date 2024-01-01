import { View, Text, Pressable, StyleSheet, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'

import COLORS from '../constants/colors'
import { DATABASE_ENDPOINT, MONGODB_API_KEY } from './config'

import fallbackImage from '../assets/onboardImage.jpg'
import { ScrollView } from 'react-native-gesture-handler'
import MyLoader from './MyContentLoader'

const fetchDetailsFromDb = async (classNumber) => {

	let response
	try {

		response = await fetch(DATABASE_ENDPOINT,
			{
				method: 'POST',
				cache: 'no-cache', //may break api , remove is problem occurs
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'apiKey': MONGODB_API_KEY
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

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const details = await response.json();
		// console.log(details)
		return (details.document)

	} catch (error) {
		console.error('fetch failed: ', error)
		Alert.alert('fetch failed', error)
	}
}

const DetectionCard = ({ box, name, confidence, classNumber }) => {

	const [data, setData] = useState(null);
	const [renderSkeleton, setRenderSkeleton] = useState(true)
	// let data;

	useEffect(() => {

		const fetchData = async () => {
			try {
				const result = await fetchDetailsFromDb(classNumber);
				// console.log("_______________________________________________________________________________________________")
				// descriptions = {_id, classNumber, className, imageLink, latitude, longitude, constructionDate, constructedBy, Description, Ticket, Restrictions, TimeOpen, TimeClose};
				// details = {...data}
				// setDescription([])
				// console.log(result)
				// setDescription(data.Description)
				setRenderSkeleton(false)
				setData(result)

			} catch (error) {
				console.error('fetching from db failed', error);
				//code to handle error in app , display some alert sth else
			}
		}

		fetchData();

		return (
			() => {
				console.log('clear use effect');
				setData(null);
				setRenderSkeleton(true)
			}
		)

	}, [classNumber])


	// if (!data) {
	// 	// Return a placeholder or loading state
	// 	return <View><Text>loading...</Text></View>;
	//   }

	// const {className, Description, latitude, longitude, imageLink} = fetchDetailsFromDb(classNumber)

	// const { imageLink, latitude, longitude, Description, Ticket, Restriction, TimeOpen, TimeClose } = descriptions
	// const imageSource = (imageLink ? { uri: imageLink } : fallbackImage)

	// const imageSource = data.imageLink ? data.imageLink : fallbackImage

	return (
		<View>
			{renderSkeleton && <MyLoader/>}
			{data ? <View style={styles.outer}>

				<View style={styles.card}>
					{/* FETCH descriptions and images from db */}
					<Image source={data.imageLink ? { uri: data.imageLink } : fallbackImage} style={styles.img} />

					<View style={styles.cardText}>

						<Text style={styles.headingText}>{name} - {confidence}%</Text>

						{data && <Text style={styles.description}>{data.Description}</Text>}

						<View style={styles.btnContainer}>
							<Pressable
								onPress={() => Alert.alert('you really wanna know more?')}
								style={({ pressed }) => ({ backgroundColor: pressed ? 'gray' : 'black', ...styles.btnStyle })}
							>
								<Text style={{ color: 'white' }}>Know More</Text>

							</Pressable>

							<Pressable style={({ pressed }) => ({ backgroundColor: pressed ? 'gray' : 'black', ...styles.btnStyle })}>
								<Text style={{ color: 'white' }}>Add to plan</Text>
							</Pressable>

						</View>

					</View>

				</View>
			</View>
			:
			<MyLoader />}

		</View>
	)
}


const styles = StyleSheet.create({
	outer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		margin: 10,
		marginBottom: 0,
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
		textAlign: 'justify',
		flexGrow: 1,
	},
	btnContainer: {
		flex: 1,
		flexGrow: 1,
		flexDirection: 'row',
		// backgroundColor: 'red',
		alignSelf: 'stretch',
		justifyContent: 'space-evenly',
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
	img: {
		padding: 0,
		margin: 0,
		width: 100,
		height: 'auto',
		borderRadius: 7,
		// objectFit: 'contain'

	},

	btnStyle: {

		borderRadius: 7,
		flex: 0,
		color: 'white',
		justifyContent: 'center',
		paddingLeft: 5,
		paddingRight: 5,
		height: 30,
	}

})

const Detections = ({ navigation }) => {

	const route = useRoute();
	const { detections, imageURL, numberOfDetection } = route.params
	// const detectionData = route.params;

	return (
		<ScrollView>

			{/* <Text style={{ backgroundColor: COLORS.primary, fontWeight: 'bold', fontSize: 25, textAlign: 'center', color: 'white', paddingBottom: 3 }}>Detections</Text>
			<Text style={{ color: 'black' }}>{numberOfDetection} sites were discovered</Text>

			<Text style={{ color: 'black' }}>the image url is{imageURL}</Text> */}

			{/* {console.log(detectionData)} */}

			{/* {detections.length ? <Text style={{ color: 'black' }}>There are some detections</Text> : <Text style={{ color: 'black' }}>There are no detections</Text>} */}
			{/* {console.log('inside detections: ******************************************************************************************************************************************')} */}

			{/* {console.log(detections[0])}

			{
				detections.map((det) => {

					const {box, classNumber, confidence, name} = det
					console.log(classNumber)
					
				}
				)
			} */}

			{
				detections.length ? (
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