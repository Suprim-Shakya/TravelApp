import { View, Text, Button } from 'react-native'
import React, { useRef, useState } from 'react'
import RBSheet from 'react-native-raw-bottom-sheet';

import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { API_ENDPOINT } from './config';
import { useNavigation } from '@react-navigation/native';
import CustomButton from './CustomButton';




const BottomDrawer = ({ refRBSheet }) => {

	const navigation = useNavigation();
	// const refRBSheet = useRef();
	const [responseImageURL, setResponseImageURL] = useState('');
	const [responseName, setResponseName] = useState('');

	const handleDetection = ({ detections, imageURL, numberOfDetection }) => {
		navigation.navigate('Scan', { screen: 'Detections', params: { detections, imageURL, numberOfDetection } })
	}

	const openCamera = async () => {
		const options = {};
		try {
			const callbackFxn = async (response) => {

				if (response.didCancel) {
					return
				} //user didn't click image


				const formData = new FormData();
				formData.append(
					'file', {
					uri: response.assets[0].uri,
					type: response.assets[0].type,
					name: response.assets[0].fileName,
				});

				await sendImageToServer(formData);
			}
			await launchCamera(options, callbackFxn);

		} catch (error) {
			console.error('Error occurred while sending image to server from camera: ', error);
			Alert.alert("Couldn't send image to server.")
		}
	}


	const openGallery = async () => {
		try {

			const callbackFxn = async (response) => {

				if (response.didCancel) {
					return
				} //user didn't select image


				const formData = new FormData();
				formData.append(
					'file', {
					uri: response.assets[0].uri,
					type: response.assets[0].type,
					name: response.assets[0].fileName,
				});

				await sendImageToServer(formData);
			}
			await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, callbackFxn);

		} catch (error) {
			console.error('Error occurred while sending image to server from gallery: ', error);
			Alert.alert("Couldn't send image to server.")
		}
	}


	const sendImageToServer = async (formData) => {
		// setIsLoading(true);
		try {
			const response = await fetch(API_ENDPOINT, {
				method: 'post',
				body: formData,
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})

			// if (!response.ok) {
			//     throw new Error(`HTTP error! Status: ${response.status}`);
			// }

			const responseJson = await response.json();

			handleDetection({ ...responseJson.data })

			// console.log(responseJson)
			// setResponse(responseJson.message);
			// setResponseImageURL(responseJson.data.imageURL);
			// responseJson.data.detections[0] ? setResponseName(responseJson.data.detections[0].name) : setResponseName('No detections')

		} catch (error) {
			if (error.message === 'Network request failed') {
				Alert.alert('Internet unstable', 'Please check your internet connection')
			} else {
				console.error('Error occurred on post request send to server: ', error)
			}

		} finally {
			// setIsLoading(false)
		}
	}


	return (
		<RBSheet
			ref={refRBSheet}
			closeOnDragDown={true}
			closeOnPressBack={true}
			customStyles={{ wrapper: { backgroundColor: 'rgba(0,0,0, 0.8)' }, draggableIcon: { backgroundColor: "#000" } }}
		>
			<CustomButton title='Open Camera' onPress={() => { refRBSheet.current.close();openCamera() }} iconName='camera-alt' text='Camera'/>
			<CustomButton title='Open Gallery' onPress={()=>{refRBSheet.current.close();openGallery()}} iconName='photo' text='Gallery'/>
			<CustomButton title='Cancel' onPress={() => refRBSheet.current.close()} iconName='cancel' text='Cancel'/>
		</RBSheet>
	)
}

export default BottomDrawer

//TODO: now after img open / camera complete show loading or show skeleton 