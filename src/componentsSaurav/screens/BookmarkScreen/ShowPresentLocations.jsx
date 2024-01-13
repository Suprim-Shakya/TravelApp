import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import ListItem from './ListItem'
import { ScrollView } from 'react-native-gesture-handler'
import DetectionCard from '../../customComponents/DetectionCard'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import { getSavedPlaces } from '../../modules/localStore'

// const arr = ['1', '2', '3', '4', '5']

const ShowPresentLocations = ({ navigation }) => {

    const [locations, setLocations] = useState([])
    useEffect(()=>{
        
        async function getSaved () {
            const dataArray = await getSavedPlaces();
            setLocations(dataArray);
        }

        getSaved();

    }, [])
    return (
        <ScrollView>
            <Text></Text>
            <Button title="bookmark screen" onPress={() => navigation.navigate('BookmarksScreen')} />

            {
                locations.map((item, index) => {
                    return <DetectionCard key = {index} classNumber={Number(item)} fromDetection={false}/>
                })
            }
        </ScrollView>
    )
}

export default ShowPresentLocations

const styles = StyleSheet.create({})