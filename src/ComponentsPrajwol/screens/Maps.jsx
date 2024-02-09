import React, { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import CustomCallout from '../../componentsSaurav/customComponents/CustomCallout';

const Maps = ({ route }) => {
	const [selectedCoordinates, setSelectedCoordinates] = useState({ latitude: 0, longitude: 0 });

	const mapRef = useRef();
	const [latitude, setLatitude] = useState()
	const [longitude, setLongitude] = useState()

	const { location, title, description } = route.params
	useEffect(() => {
		if (route?.params && route.params?.location) {
			setSelectedCoordinates({
				latitude: location.latitude,
				longitude: location.longitude
			});
			setLatitude(location.latitude)
			setLongitude(location.longitude)
		}
	}, [route.params]);

	useEffect(() => {
		// Pan the map to the new marker location when selectedLocation changes
		if (mapRef.current && selectedCoordinates) {
			mapRef.current.animateToRegion({
				latitude: selectedCoordinates.latitude,
				longitude: selectedCoordinates.longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			});
		}
	}, [selectedCoordinates]);

	return (
		<View style={{ flex: 1 }}>
			{Boolean(selectedCoordinates.latitude) &&
				<MapView
					ref={mapRef}
					style={{ flex: 1 }}
					initialRegion={{
						latitude: latitude,
						longitude: longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				>

					<Marker
						coordinate={{ latitude: selectedCoordinates.latitude, longitude: selectedCoordinates.longitude }}
						// title={title}
						// description={description}
					>
					 	<CustomCallout
								title={title}
								description={description}
							/>
						</Marker>

					{/* <Marker
					coordinate={{
						latitude: 27.688055,
						longitude: 85.327595,
					}}
					// title={"default title"}
					// description={"This is the description"}
					>
					<CustomCallout
					title={"place you selected "}
					description="Marker Description saurav khanal is my name what is yours"
					/>
				</Marker> */}
				</MapView>
			}
		</View>
	);
};



export default Maps;
