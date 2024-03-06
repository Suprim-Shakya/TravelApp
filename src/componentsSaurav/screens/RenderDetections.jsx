import { View, Text, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import DetectionCard from '../customComponents/DetectionCard'
import MyLoader from '../customComponents/DetectionLoaderSkeleton';


const RenderDetections = ({ route }) => {

	if (route.params.loading) {
		return <MyLoader />
	}

	else if (!route.params.loading) {
		const { detections, imageURL, numberOfDetection } = route.params;
		return (
			<ScrollView style={styles.scrollView}>

				{
					detections.length ?
						detections.map((detection, index) => <DetectionCard key={index} {...detection} />)
						:
						<View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: 800 }}>
							<Text style={{ fontSize: 20, color: 'black' }}>No sites are found.</Text>
						</View>
				}

			</ScrollView>
		)
	}
	
}

export default RenderDetections

const styles = StyleSheet.create({
	scrollView: {
		minHeight: '100%',
	}
})
