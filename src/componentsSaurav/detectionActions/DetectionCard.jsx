import fetchDetailsFromDb from "./fetchDetailsFromDb";
import fallbackImage from '../../assets/onboardImage.jpg'
import { StyleSheet, View, Image, Text, Pressable,Alert } from "react-native";

const DetectionCard = ({ box, name, confidence, classNumber }) => {

	const [data, setData] = useState(null);
	// let data;

	useEffect(() => {

		const fetchData = async () => {
			try {
				const result = await fetchDetailsFromDb(classNumber);
				console.log
				// descriptions = {_id, classNumber, className, imageLink, latitude, longitude, constructionDate, constructedBy, Description, Ticket, Restrictions, TimeOpen, TimeClose};
				setData(result)

			} catch (error) {
				console.error('fetching from db failed', error);
				//code to handle error in app , display some alert sth else
			}
		}

		fetchData();

	}, [classNumber])

	return (

		data && <View style={styles.outer}>
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
							<Text>Know More</Text>

						</Pressable>

						<Pressable style={({ pressed }) => ({ backgroundColor: pressed ? 'gray' : 'black', ...styles.btnStyle })}><Text >Add to plan</Text></Pressable>

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


export default DetectionCard