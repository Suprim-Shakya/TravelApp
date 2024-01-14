import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import DetectionCard from '../../customComponents/DetectionCard';

const RenderBookmarks = () => {

    
    const bookmarks = useSelector(state=> state.bookmark);
    // bookmarks.map(item => console.log(item))
    console.log(bookmarks)

    return (
        <ScrollView>
            <Text style={{color: 'black'}}>this is bookmark screen</Text>
            {
                bookmarks.map((item, index) => {
                    // console.log(item)
                    // console.log('inside')
                    // <Text style={{color: 'black'}}>this is bookmark screen</Text>
                    return <DetectionCard key={index} classNumber={Number(item.classNumber)} fromDetection={false}/>
                })
            }
        </ScrollView>
    )
}

export default RenderBookmarks

const styles = StyleSheet.create({})