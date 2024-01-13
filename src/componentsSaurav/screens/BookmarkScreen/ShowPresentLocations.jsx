import { StyleSheet, Text, View, Button, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import ListItem from './ListItem'
import { ScrollView } from 'react-native-gesture-handler'
import DetectionCard from '../../customComponents/DetectionCard'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import { getSavedPlaces } from '../../modules/localStore'
import CustomButton from '../../customComponents/CustomButton'

// const arr = ['1', '2', '3', '4', '5']

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
            <Text></Text>
            {/* <Button title="bookmark screen" onPress={() => navigation.navigate('BookmarksScreen')} /> */}
            {/* <Button title="Refresh" onPress={triggerRefresh} /> */}
            <CustomButton text={'Refresh'} onPress={triggerRefresh}/>

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