import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import DetectionCard from '../../customComponents/DetectionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadExistingBookmark } from "../../redux/features/bookmarkSlice";

const RenderBookmarks = () => {

    const dispatch = useDispatch();

    const bookmarks = useSelector(state => state.bookmark);

    // bookmarks.map(item => console.log(item))
    // console.log(`\n The bookmarks are: \n${bookmarks}\n(from render bookmarks screen)`)

    useEffect(() => {

        console.log('inside use effect of bookmarks')

        const loadLocalBookmarks = async () => {
            // console.log('\ntrying to dispatch the value')
            const localBookmarks = await AsyncStorage.getItem('bookmark');
            // console.log('\ninside the function')
            console.log(`local bookmark is null? ${localBookmarks}`)
            // console.log(typeof localBookmarks)
            const valueToSend = JSON.parse(localBookmarks)
            // console.log(typeof valueToSend)
            // console.log(Array.isArray(valueToSend))

            if (localBookmarks !== null) {
                // console.log('\ntrying to dispatch the value')
                dispatch(loadExistingBookmark(valueToSend))
                // console.log('\nafter to dispatch the value')
            }
            else {
                console.log(`local bookmark is null? ${localBookmarks}`)
            }

        };

        loadLocalBookmarks();

    }, []);

    useEffect(() => {

        const saveBookmarksToLocal = async () => {
            // console.log(`\n trying to save bookmark data to local`)
            await AsyncStorage.setItem('bookmark', JSON.stringify(bookmarks))
            // const val = await AsyncStorage.getItem('bookmark')
            // console.log(`\nChange after trying to save is: ${val}`)

        };

        saveBookmarksToLocal();

    },[bookmarks.length]);




    return (
        <ScrollView>
            {/* <Text style={{color: 'black'}}>this is bookmark screen</Text> */}
            {
                bookmarks.length > 0 ? bookmarks.map((item, index) => {
                    // console.log(item)
                    // console.log('inside')
                    // <Text style={{color: 'black'}}>this is bookmark screen</Text>
                    return <DetectionCard key={index} classNumber={Number(item.classNumber)} fromDetection={false} />
                })
                    : <Text style={{ color: 'black', textAlign: 'center', paddingTop: '50%' }}>Add detections to bookmark to  view them here.</Text>
            }
        </ScrollView>
    )
}

export default RenderBookmarks

const styles = StyleSheet.create({})