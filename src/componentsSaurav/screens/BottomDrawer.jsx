import React from 'react'
import RBSheet from 'react-native-raw-bottom-sheet';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../customComponents/CustomButton';
import openGallery from '../getImage/openGallery';
import openCamera from '../getImage/openCamera';
import sendImageToServer from '../apiCalls/sendImageToServer';
import { Alert } from 'react-native';

async function handleResponse(func, navigation) {
	const formData = await func();
	if (formData == 'cancel') {
		return false
	} else {
		navigation.navigate('MainStack', { screen: 'RenderDetections', params: {loading: true} })
			const response = await sendImageToServer(formData);
			if (response){
				navigation.navigate('MainStack', { screen: 'RenderDetections', params: { ...response, loading: false } })
			}
			else {
				Alert.alert("Couldn't process the request", "Image size too large")
				navigation.goBack()
			}
	}
}

const BottomDrawer = ({ refRBSheet }) => {

	const navigation = useNavigation();

	const handleOpenGallery = async () => {
		refRBSheet.current.close();
		await handleResponse(openGallery, navigation)
	}

	const handleOpenCamera = async () => {
		refRBSheet.current.close();
		await handleResponse(openCamera, navigation)
	}

	return (
		<RBSheet
			ref={refRBSheet}
			closeOnDragDown={true}
			closeOnPressBack={true}
			animationType='fade'
			closeDuration={250}
			customStyles={{ wrapper: { backgroundColor: 'rgba(0,0,0, 0.8)',  }, draggableIcon: { backgroundColor: "#e0e0e0" } }}
		>
			<CustomButton
				title='Open Camera'
				onPress={handleOpenCamera}
				iconName='camera'
				text='Camera'
			/>
			<CustomButton
				title='Open Gallery'
				onPress={handleOpenGallery}
				iconName='image'
				text='Gallery'
			/>
			<CustomButton title='Cancel' onPress={() => refRBSheet.current.close()} iconName='cancel' text='Cancel' />
		</RBSheet>
	)
}

export default BottomDrawer
