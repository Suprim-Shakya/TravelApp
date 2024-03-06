import { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import CustomCallout from '../../componentsSaurav/customComponents/CustomCallout';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MAPS_API_KEY } from '../config';
import SmallButton from '../customComponents/SmallButton';
import { useDispatch } from 'react-redux';
import { addToPlan } from '../redux/features/planSlice';
import Icon from "react-native-vector-icons/MaterialIcons"
import COLORS from '../../constants/colors';

const GoogleSearch = ({ navigation, route }) => {

    // const [currentLocation, setCurrentLocation] = useState({})
    const [selectedPlace, setSelectedPlace] = useState('Kathmandu Engineering College')
    const [selectedLocation, setSelectedLocation] = useState({ latitude: 27.699119143463104, longitude: 85.29716794206476 });
    const mapRef = useRef();
    const dispatch = useDispatch();
    const [calloutVisible, setCalloutVisible] = useState(true)

    useEffect(() => {
        if (route?.params) {
            const { latitude, longitude } = route.params.location
            setSelectedPlace(route.params.name)
            setSelectedLocation({ latitude, longitude })
        }

    }, [route.params])


    // async function afterMapLoads() { // go to current location
    //     (async () => {
    //         const { latitude, longitude } = await getmyLocation()
    //         setCurrentLocation({ latitude, longitude })
    //     })();
    // }

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

    const toggleCallout = () => setCalloutVisible(v => !v)

    // function handleGoToMyLocation() {
    //     setSelectedPlace("You are here")
    //     setSelectedLocation({ ...currentLocation })
    // }

    async function handleLongPress(event) {
        const { latitude, longitude } = (event.nativeEvent.coordinate)
        setSelectedLocation({ latitude, longitude })
        // console.log(latitude, " ", longitude)
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAPS_API_KEY}`
            );
            const data = await response.json();
            if (data.results.length > 0) {
                // console.log(data)
                const placeName = data.results[0].formatted_address;
                // console.log('Place name:', placeName);

                function modifyName(placeName) {
                    const parts = placeName.split(",");
                    if (parts.length >= 3) {
                        parts.shift(); // Remove the first element
                        return parts.join(",").trim();
                    } else {
                        return placeName.trim();
                    }
                }
                const newPlaceName = modifyName(placeName)
                setCalloutVisible(true)
                setSelectedPlace(newPlaceName)
            }
        } catch (error) {
            console.error('Error fetching reverse geocoding:', error);
        }
        // console.log(Point)

    }

    return (
        <View style={{ flex: 1 }}>
            <Icon name='search' size={24} color={'black'} style={styles.icon} />
            {/* <Pressable style={styles.myLocation}
                android_ripple={{
                    foreground: true,
                    radius: 20,
                    color: "rgba(0,0,0,0.2)",
                    borderless: false,
                }}
                onPress={handleGoToMyLocation}
            >
                <Icon name='my-location' size={24} color={'black'} />
            </Pressable> */}
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
                    setCalloutVisible(true)
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
                enablePoweredByContainer={false}
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
                // onMapReady={afterMapLoads}
                onLongPress={handleLongPress}
            >

                <Marker
                    coordinate={{ latitude: selectedLocation.latitude, longitude: selectedLocation.longitude }}
                    // title={selectedPlace}
                    // description={description}
                    onPress={toggleCallout}

                >
                    <CustomCallout
                        title={selectedPlace}
                        // description={"You can add this place to your plan"}
                        visible={calloutVisible}
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
            paddingLeft: 35,
            backgroundColor: COLORS.white,
        },
        separator: {
            height: 1,
            backgroundColor: "grey"
        },
        description: {
            color: 'grey',
        },
        listView: {
            borderColor: 'grey',
            borderWidth: 1,
        },
        row: {
            // backgroundColor: "red",
        }
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
        justifyContent: "center",
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    btnContainer: {
        flexDirection: 'row'
    },
    icon: {
        position: 'absolute',
        left: 15,
        top: 20,
        zIndex: 5
    },
    myLocation: {
        position: 'absolute',
        bottom: 120,
        right: 20,
        zIndex: 5,
        backgroundColor: "white",
        borderRadius: 100,
        padding: 10,
        overflow: 'hidden'
    }
})


export default GoogleSearch;