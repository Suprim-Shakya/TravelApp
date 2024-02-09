import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import CustomCallout from '../../componentsSaurav/customComponents/CustomCallout';

const Maps = ({ route }) => {
	const [selectedCoordinates, setSelectedCoordinates] = useState({ latitude: 0, longitude: 0 });

	useEffect(() => {
		if (route.params && route.params.locations) {
			setSelectedCoordinates({ ...route.params.locations });
		}
	}, [route.params]);

	return (
		<View style={{ flex: 1 }}>
			<MapView
				style={{ flex: 1 }}
				initialRegion={{
					...route.params.locations,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
			>
				{/* <Marker
					coordinate={{ latitude: 27.688055, longitude: 85.327595 }}
					title={"default title"}
					description={"This is the description"}
				>
					<CustomCallout
						title={"place you selected "}
						description="Marker Description saurav khanal is my name what is yours"
					/>
				</Marker> */}
				{selectedCoordinates.latitude !== 0 && (
					<Marker
						coordinate={selectedCoordinates}
						title={route.params.title}
						description={route.params.description}
					/>
				)}
			</MapView>
		</View>
	);
};



export default Maps;
