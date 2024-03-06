import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import fallbackImage from '../../assets/onboardImage.jpg'
import MyLoader from './DetectionLoaderSkeleton'
import fetchDetailsFromDb from "../apiCalls/fetchDataFromDB";
import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import { addToBookmark, removeFromBookmark } from "../redux/features/bookmarkSlice";
import { addToPlan,removeFromPlan } from "../redux/features/planSlice";
import BookmarkButton from "./BookmarkButton";
import PlanButton from "./PlanButton";
import COLORS from "../../constants/colors";

const DetectionCard = ({ box, name, confidence, classNumber, fromDetection = true }) => {

	const navigation = useNavigation();
	const [data, setData] = useState(null);

	const dispatch = useDispatch();

	const bookmarks = useSelector(state => state.bookmark.bookmark);
	const classPresentInBookmark = bookmarks.find((item) => item.classNumber == classNumber)
	const [isBookmarked, setIsBookmarked] = useState(classPresentInBookmark)

	const plans = useSelector(state => state.plan.plan);
	const classPresentInPlan = plans.find((item) => item.name == name)
	const [onPlan, setOnPlan] = useState(classPresentInPlan)


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
				// console.log('clear use effect');
				setData(null);
				// setRenderSkeleton(true)
			}
		)

	}, [classNumber])

	const handleKnowMore = () => {
		// console.log('hello')
		navigation.navigate("DetailsScreen", { ...data })
		// navigation.navigate('DetectionDetail', { ...data } )
		// console.log('hello')
		// console.log('Navigation to DetectionDetail screen complete');
	}


	const handleAddToBookmark = async () => {

		// console.log('inside add to bookmark')

		const ATB = () => {
			const dataObj = {
				classNumber,
				name,
				location: { latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude) }
			}
			// dispatch(addToBookmark({ classNumber: Number(classNumber) })); 
			dispatch(addToBookmark(dataObj));
			// console.log("\n\n\n\n\n start add to bookmark function -------------\n")
			// Alert.alert(`${name} must be saved on Bookmarks.`, `Navigate to Bookmarks tab to access it.`)

			// bookmarks.map(item => console.log(item))
			// console.log("\nend add to bookmark function -------------")
			setIsBookmarked(true)
		}

		const RFB = () => {
			dispatch(removeFromBookmark(classNumber))// check datatype 

			// Alert.alert(`${data.name} must be removed.`, `Navigate to Bookmarks tab to access it.`)
			// const bookmarks = useSelector(state=> state.bookmark);
			// console.log("\n\n\n\n\n start remove bookmark function**************\n")
			// bookmarks.map(item => console.log(item))
			// console.log("\n\end remove bookmark function***************")
			setIsBookmarked(false)
		}

		!isBookmarked ? ATB() : RFB(); //add to bookmark or remove from bookmark

	}

	const handleAddToPlan = async () => {

		// console.log('inside add to plan')

		const ATP = () => {
			const dataObj = {
				name,
				location: { latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude) }
			}
			// console.log(name)
			dispatch(addToPlan(dataObj));
			
			// console.log("\n\n\n\n\n start add to bookmark function -------------\n")
			// Alert.alert(`${name} must be saved on Bookmarks.`, `Navigate to Bookmarks tab to access it.`)

			plans.map(item => console.log(item))
			// console.log("\nend add to bookmark function -------------")
			setOnPlan(true)
		}

		const RFP = () => {
			dispatch(removeFromPlan(name))// check datatype 

			// Alert.alert(`${data.name} must be removed.`, `Navigate to Bookmarks tab to access it.`)
			// const plan = useSelector(state=> state.plan.plan);
			// console.log("\n\n\n\n\n start remove bookmark function**************\n")
			// plans.map(item => console.log(item))
			// console.log("\n\end remove bookmark function***************")
			setOnPlan(false)
		}

		!onPlan ? ATP() : RFP(); //add to bookmark or remove from bookmark

	}

	return (
		<View>
			{/* {renderSkeleton && <MyLoader/>} */}
			{data ? <View style={styles.outer}>

				<Pressable
					android_ripple={{ color: 'rgba(0, 0,0, 0.2)' }}
					style={styles.card}
					onPress={handleKnowMore}
				>
					{/* FETCH descriptions and images from db */}
					<Image source={data.imageLink ? { uri: data.imageLink } : fallbackImage} style={styles.img} />

					<View style={styles.cardText}>


						<Text style={styles.headingText}>{name || data.className} {confidence && `- ${confidence} %`}</Text>


						{data && <Text style={styles.description}>{data.Description && data.Description.slice(0, 150)}...</Text>}

					</View>


					<View style={styles.btnContainer}>
						<BookmarkButton onPress={handleAddToBookmark} active={isBookmarked} />
						<PlanButton onPress={handleAddToPlan} on active={onPlan} />
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
		marginBottom: 8,
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
	img: {
		padding: 0,
		margin: 0,
		width: 110,
		height: 'auto',
		borderRadius: 5,
		// objectFit: 'contain'
	},
	cardText: {
		flex: 3,
		alignItems: 'center',
		width: '100%',

	},
	btnContainer: {
		maxWidth:30,
		flex:1,
		flexDirection: "column",
		justifyContent: 'space-evenly',
		backgroundColor: COLORS.secondary,
		borderRadius: 5,
		// borderWidth: 1,
		// borderColor: COLORS.dark,
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
})

export default DetectionCard