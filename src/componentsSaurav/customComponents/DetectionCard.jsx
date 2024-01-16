import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import fallbackImage from '../../assets/onboardImage.jpg'
import MyLoader from './DetectionLoaderSkeleton'
import fetchDetailsFromDb from "../apiCalls/fetchDataFromDB";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToBookmark, removeFromBookmark } from "../redux/features/bookmarkSlice";
import BookmarkButton from "./BookmarkButton";

const DetectionCard = ({ box, name, confidence, classNumber, fromDetection = true }) => {
	const navigation = useNavigation();
	const [data, setData] = useState(null);

	const dispatch = useDispatch();
	const bookmarks = useSelector(state => state.bookmark);

	const classPresentInBookmark = bookmarks.find((item) => item.classNumber == classNumber)

	const [isBookmarked, setIsBookmarked] = useState(classPresentInBookmark)

	// fromDetection = !isBookmarked;

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
		navigation.navigate('Scan', { screen: 'DetectionDetail', params: { ...data } })
		console.log('hello')
	}

	// const handleAddToPlan = async() => {
	// 	fromDetection ? await addPlace(String(classNumber))
	// 	.then((response) => {
	// 		if (response){
	// 			Alert.alert(`${name} is successfully saved on Bookmarks.`, `\nNavigate to Bookmarks tab to access it.`)
	// 		} else {
	// 			Alert.alert('', `${name} is already saved.\n\nNavigate to Bookmarks tab to access it.`)
	// 		}
	// 	}) 
	// 	: await removePlace(String(classNumber))
	// 	.then((response)=> {
	// 		if (response){
	// 			Alert.alert('',`${data.className} is successfully removed from Bookmarks.`)
	// 		} else {
	// 			Alert.alert('', `${data.className} couldn't be removed`)
	// 		}
	// 	})
	// }

	const handleAddToPlan = async () => {

		console.log('inside add to plan')

		const ATB = () => {
			const dataObj = {
				classNumber: classNumber,
				location: { lat: parseFloat(data.latitude), lng: parseFloat(data.longitude) }
			}
			// dispatch(addToBookmark({ classNumber: Number(classNumber) })); 
			dispatch(addToBookmark(dataObj));
			console.log("\n\n\n\n\n start add to bookmark function -------------\n")
			// Alert.alert(`${name} must be saved on Bookmarks.`, `Navigate to Bookmarks tab to access it.`)

			bookmarks.map(item => console.log(item))
			console.log("\nend add to bookmark function -------------")
			setIsBookmarked(true)
		}

		const RFB = () => {
			dispatch(removeFromBookmark(classNumber))// check datatype 

			// Alert.alert(`${data.name} must be removed.`, `Navigate to Bookmarks tab to access it.`)
			// const bookmarks = useSelector(state=> state.bookmark);
			console.log("\n\n\n\n\n start remove bookmark function**************\n")
			bookmarks.map(item => console.log(item))
			console.log("\n\end remove bookmark function***************")
			setIsBookmarked(false)
		}

		!isBookmarked ? ATB() : RFB();

	}


	return (
		<View>
			{/* {renderSkeleton && <MyLoader/>} */}
			{data ? <View style={styles.outer}>

				<Pressable android_ripple={true} style={styles.card} onPress={() => handleKnowMore()}>
					{/* FETCH descriptions and images from db */}
					<Image source={data.imageLink ? { uri: data.imageLink } : fallbackImage} style={styles.img} />

					<View style={styles.cardText}>

						<Text style={styles.headingText}>{name || data.className} {confidence && `- ${confidence} %`}</Text>

						{data && <Text style={styles.description}>{data.Description && data.Description.slice(0, 200)}...</Text>}

						<BookmarkButton onPress={handleAddToPlan} active={isBookmarked} />


					</View>

				</Pressable>
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
})

export default DetectionCard