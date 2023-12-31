import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { View, Text, Alert } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomButton from './CustomButton';


const BottomDrawer = ({ refRBSheet }) => {
	const navigation = useNavigation();
	return (
		<RBSheet
			ref={refRBSheet} // Pass the refRBSheet directly to the ref prop
			closeOnDragDown={true}
			closeOnPressBack={true}
			// height={500}
			customStyles={{
				wrapper: { backgroundColor: 'rgba(0,0,0, 0.3)' },
				draggableIcon: { backgroundColor: '#000' },
			}}
		>
			{/* <Text>Hello from BottomDrawer</Text> */}

			<CustomButton
				text='Open Camera'
				iconName='camera-alt'
				onPress={
					() => {
						refRBSheet.current.close();
						navigation.navigate('Scan', { screen: 'Detections', params: { initiator: 'camera' } })
					}
				}
			/>

			<CustomButton
				text='Open Gallery'
				iconName='photo'
				onPress={
					() => {
						refRBSheet.current.close();
						navigation.navigate('Scan', { screen: 'Detections', params: { initiator: 'gallery' } })
					}
				}
			/>
			{/* <CustomButton text='nav ' onPress={() => { refRBSheet.current.close(); navigation.navigate('Maps') }} /> */}
			<CustomButton text='Cancel Scan' onPress={() => refRBSheet.current.close()} iconName={'cancel'} />

		</RBSheet>
	);
};

export default BottomDrawer;
