import { StyleSheet, View, Text, Pressable,Image,Alert } from "react-native";
import React,{useState, useEffect} from "react";
import fallbackImage from '../../assets/onboardImage.jpg'
import MyLoader from './DetectionLoaderSkeleton'
import fetchDetailsFromDb from "../apiCalls/fetchDataFromDB";
import { useNavigation } from "@react-navigation/native";
import { removePlace, addPlace } from "../modules/localStore";

const DetectionCard = ({ box, name, confidence, classNumber, fromDetection = true}) => {
	const navigation = useNavigation();
	const [data, setData] = useState(null);
	// const [renderSkeleton, setRenderSkeleton] = useState(true);
	// let data;

	useEffect(() => {

		const fetchData = async () => {
			try {
				const result = await fetchDetailsFromDb(classNumber);
				// setRenderSkeleton(false)
                // console.log(result)
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
				// setRenderSkeleton(true)
			}
		)

	}, [classNumber])

	const handleKnowMore = () => {
		console.log('hello')
		navigation.navigate('Scan', { screen: 'DetectionDetail', params: { ...data} })
		console.log('hello')
	}

	const handleAddToPlan = async() => {
		fromDetection ? await addPlace(String(classNumber))
		.then((response) => {
			if (response){
				Alert.alert(`${name} is successfully saved on Bookmarks.`, `\nNavigate to Bookmarks tab to access it.`)
			} else {
				Alert.alert('', `${name} is already saved.\n\nNavigate to Bookmarks tab to access it.`)
			}
		}) 
		: await removePlace(String(classNumber))
		.then((response)=> {
			if (response){
				Alert.alert('',`${data.className} is successfully removed from Bookmarks.`)
			} else {
				Alert.alert('', `${data.className} couldn't be removed`)
			}
		})
	}

	return (
		<View>
			{/* {renderSkeleton && <MyLoader/>} */}
			{data ? <View style={styles.outer}>

				<View style={styles.card}>
					{/* FETCH descriptions and images from db */}
					<Image source={data.imageLink ? { uri: data.imageLink } : fallbackImage} style={styles.img} />

					<View style={styles.cardText}>

						<Text style={styles.headingText}>{name || data.className} {confidence&& `- ${confidence} %`}</Text>

						{data && <Text style={styles.description}>{data.Description && data.Description.slice(0,150)}...</Text>}

						<View style={styles.btnContainer}>
							<Pressable
								onPress={()=>handleKnowMore()}
								style={({ pressed }) => ({ backgroundColor: pressed ? 'gray' : 'black', ...styles.btnStyle })}
							>
								<Text style={{ color: 'white' }}>Know More</Text>

							</Pressable>

							<Pressable style={({ pressed }) => ({ backgroundColor: pressed ? 'gray' : 'black', ...styles.btnStyle })} onPress={handleAddToPlan}>
								<Text style={{ color: 'white' }}>{fromDetection? 'Add to Plan' : 'Remove'}</Text>
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
		fontSize: 16
	},
	description: {
		color: 'black',
		padding: 5,
		textAlign: 'justify',
		flexGrow: 1,
		overflow: 'hidden',
		// fontSize: 14
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
		width: 110,
		height: 'auto',
		borderRadius: 5,
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

export default DetectionCard