import { Button, StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { API_ENDPOINT } from './config';



const ScanImage = ({ navigation }) => {

    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [responseImageURL, setResponseImageURL] = useState('');
    const [responseName, setResponseName] = useState('');

    const handleDetection = (detectionData) => {
        navigation.navigate('Detections', { ...detectionData })
    }

    const openCamera = async () => {
        const options = {};
        try {
            const images = await launchCamera(options);
            const formData = new FormData();
            formData.append(
                'file', {
                uri: images.assets[0].uri,
                type: images.assets[0].type,
                name: images.assets[0].fileName,
            });

            await sendImageToServer(formData);

        } catch (error) {
            console.error('Error occurred while sending image to server from camera: ', error);
            Alert.alert("Couldn't send image to server.")
        }
    }


    const openGallery = async () => {
        // const options = {};
        try {
            const images = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
            const formData = new FormData();
            formData.append(
                'file', {
                uri: images.assets[0].uri,
                type: images.assets[0].type,
                name: images.assets[0].fileName,
            });

            await sendImageToServer(formData);

        } catch (error) {
            console.error('Error occurred while sending image to server from galleryx: ', error);
            Alert.alert("Couldn't send image to server.")
        }
    }


    const sendImageToServer = async (formData) => {
        setIsLoading(true);
        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'post',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseJson = await response.json();

            handleDetection(responseJson.data)
            
            // console.log(responseJson)
            // setResponse(responseJson.message);
            // setResponseImageURL(responseJson.data.imageURL);
            // responseJson.data.detections[0] ? setResponseName(responseJson.data.detections[0].name) : setResponseName('No detections')

        } catch (error) {
            if (error.message === 'Network request failed') {
                Alert.alert('Internet unstable', 'Please check your internet connection')
            } else {
                console.error('Error occurred on post request: ', error)
            }
        } finally {
            setIsLoading(false)
        }
    }


    return (

        <View style={[styles.displayFlexCenter]}>
            <View style={[styles.container, styles.displayFlexCenter]}>
                <Text>Scan Image and go to detections page </Text>
            </View>
            <View style={[styles.displayFlexCenter, { flexDirection: 'row' }]}>
                <Button title='upload image' onPress={openGallery} />
                <Button title='open camera' onPress={openCamera} />
            </View>
            {responseImageURL && (
                <Image
                    style={{ width: 400, height: 400, marginTop: 10 }}
                    source={{ uri: responseImageURL }}
                />
            )}
            {responseName && <Text style={{ color: 'black' }}>{responseName}</Text>}
        </View>
    )
}

export default ScanImage

const styles = StyleSheet.create({

    container: {
        // height: '60%',
        width: '95%',
        backgroundColor: 'red',
        borderRadius: 20,
    },
    displayFlexCenter: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',

    },
});
// TODO: show detections, extract multiple detections if present, sort based on probability, show card, add map