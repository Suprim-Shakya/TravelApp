import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import CustomCallout from '../../componentsSaurav/customComponents/CustomCallout';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MAPS_API_KEY } from '../config';
import SmallButton from '../customComponents/SmallButton';
import { useDispatch } from 'react-redux';
import { addToPlan } from '../redux/features/planSlice';

const GoogleSearch = ({ navigation }) => {

    const [selectedPlace, setSelectedPlace] = useState('Kathmandu Engineering College')
    const [selectedLocation, setSelectedLocation] = useState({ latitude: 27.69917217030569, longitude: 85.29695607495043 });

    const mapRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        // Pan the map to the new marker location when selectedPlace changes
        if (mapRef.current && selectedLocation) {
            mapRef.current.animateToRegion({
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }
    }, [selectedLocation]);

    function handleViewPlans() {
        navigation.navigate("Plan")
    }

    function handleAddToPlan() {
        const payload = {
            name: selectedPlace,
            location: { ...selectedLocation }
        }

        dispatch(addToPlan(payload))
    }

    return (
        <View style={{ flex: 1 }}>
            <GooglePlacesAutocomplete
                placeholder='Search Places to add to plan...'
                onPress={(data, details = null) => {
                    const name = data.structured_formatting.main_text;
                    const location = details.geometry.location;
                    setSelectedPlace(name);
                    setSelectedLocation({
                        latitude: parseFloat(location.lat),
                        longitude: parseFloat(location.lng)
                    });
                    console.log(selectedPlace)
                    console.log(selectedLocation)
                    // console.log(selectedPlace);
                    // setModalVisible(true)
                    // setWaypoints(prevWaypoints => [...prevWaypoints, name]);
                }}
                fetchDetails={true}
                query={{
                    key: MAPS_API_KEY,
                    language: 'en',
                    components: 'country:np',
                }}
                styles={styles.map}
            />
            <MapView
                ref={mapRef}
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: selectedLocation.latitude,
                    longitude: selectedLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >

                <Marker
                    coordinate={{ latitude: selectedLocation.latitude, longitude: selectedLocation.longitude }}
                // title={title}
                // description={description}
                >
                    <CustomCallout
                        title={selectedPlace}
                        description={"You can add this place to your plan"}
                    />

                </Marker>

            </MapView>
            <View style={styles.bottom}>
                <Text style={styles.bottomText}>{selectedPlace}</Text>

                <View style={styles.btnContainer}>
                    <SmallButton title={"View Plans"} onPress={handleViewPlans} />
                    <SmallButton title={"Add to Plan"} onPress={handleAddToPlan} />
                </View>
            </View>

        </View>
    );
};


styles = StyleSheet.create({
    container: {

    },
    map: {
        container: {
            zIndex: 2,
            position: 'absolute',
            width: "100%",
            top: 0,
            padding: 10,
        },
        textInput: {
            color: 'black',
            borderColor: "gray",
            borderWidth: 1,
        },
        separator: {
            height: 1,
            backgroundColor: "grey"
        },
        description: {
            color: 'grey',
        },
    },
    bottomText: {
        color: "black",
        fontWeight: "bold",
        fontSize: 18
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: "white",
        width: "100%",
        minHeight: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center"
    },
    btnContainer: {
        flexDirection: 'row'
    },
})


export default GoogleSearch;
