import React from 'react'
import RBSheet from 'react-native-raw-bottom-sheet';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../customComponents/CustomButton';
import openGallery from '../getImage/openGallery';
import openCamera from '../getImage/openCamera';
import sendImageToServer from '../apiCalls/sendImageToServer';



const BottomDrawer = ({ refRBSheet }) => {

	const navigation = useNavigation();

	const handleOpenGallery = async () => {
		refRBSheet.current.close();
		const formData = await openGallery();
		if (formData == 'cancel') {
			return
		} else {
			navigation.navigate('Scan', { screen: 'Skeleton' })
			const response = await sendImageToServer(formData);
			navigation.navigate('Scan', { screen: 'RenderDetections', params: { ...response } })
		}
	}

	const handleOpenCamera = async () => {
		refRBSheet.current.close();
		const formData = await openCamera();
		if (formData == 'cancel') {
			return
		} else {
			navigation.navigate('Scan', { screen: 'Skeleton' })
			const response = await sendImageToServer(formData);
			navigation.navigate('Scan', { screen: 'RenderDetections', params: { ...response } })
		}
	}

	return (
		<RBSheet
			ref={refRBSheet}
			closeOnDragDown={true}
			closeOnPressBack={true}
			customStyles={{ wrapper: { backgroundColor: 'rgba(0,0,0, 0.8)' }, draggableIcon: { backgroundColor: "#000" } }}
		>
			<CustomButton
				title='Open Camera'
				onPress={handleOpenCamera}
				iconName='camera-alt'
				text='Camera'
			/>
			<CustomButton
				title='Open Gallery'
				onPress={handleOpenGallery}
				iconName='photo'
				text='Gallery'
			/>
			<CustomButton title='Cancel' onPress={() => refRBSheet.current.close()} iconName='cancel' text='Cancel' />
		</RBSheet>
	)
}

export default BottomDrawer
