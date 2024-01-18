import { StyleSheet, Text, View, Button, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import ListItem from './ListItem'
import { ScrollView } from 'react-native-gesture-handler'
import DetectionCard from '../../customComponents/DetectionCard'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import { getSavedPlaces } from '../../modules/localStore'
import CustomButton from '../../customComponents/CustomButton'
import fetchDetailsFromDb from '../../apiCalls/fetchDataFromDB'

// const arr = ['1', '2', '3', '4', '5']
// const fetchDataFromDb = async (classNumber) => {
//     console.log("******")
//     try {
//     const result = await fetchDetailsFromDb(classNumber);
//     // console.log('Fetched data:', result);
//     console.log('Coordinates Lat:', result.latitude);
//     console.log('Coordinates Long:', result.longitude);
//     return result;
//     } catch (error) {
//       console.error('Fetching from db failed', error);
//       // Handle the error in your application (e.g., display an alert)
//       return null;
//     }
//   };

// const classNumber=23;
// const data = fetchDataFromDb(classNumber); 

const ShowPresentLocations = ({ navigation }) => {

    const [locations, setLocations] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const triggerRefresh = () => {
        setRefresh(prev => !prev)
    }

    useEffect(()=>{
        
        async function getSaved () {
            const dataArray = await getSavedPlaces();
            setLocations(dataArray);
        }

        getSaved();

    }, [refresh])
    
    return (
        <ScrollView>
            <Text>Prajwol</Text>
            {/* <Button title="bookmark screen" onPress={() => navigation.navigate('BookmarksScreen')} /> */}
            {/* <Button title="Refresh" onPress={triggerRefresh} /> */}
            <CustomButton text={'Refresh'} onPress={triggerRefresh}/>

            {
                locations.map((item, index) => {
                    return <DetectionCard key = {index} classNumber={Number(item)} fromDetection={false}/>
                })
            }
            <Pressable
                onPress={()=>fetchDataFromDb(23)}
                style={({ pressed }) => ({ backgroundColor: pressed ? 'gray' : 'black', ...styles.btnStyle })}
                >
                <Text style={{ color: 'white' }}>Pass to Map</Text>
            </Pressable>
        </ScrollView>
    )
}

export default ShowPresentLocations;

const styles = StyleSheet.create({
	
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