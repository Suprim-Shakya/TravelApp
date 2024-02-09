import { Modal, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { ScrollView } from 'react-native-gesture-handler'; //Googleplaceautocomplete does not work 
import { ScrollView } from 'react-native-virtualized-view';
import DetectionCard from '../../customComponents/DetectionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToPlan, loadExistingPlan, removeFromPlan } from "../../redux/features/planSlice";
import COLORS from '../../../constants/colors';
import CustomButton from '../../customComponents/CustomButton';
import getLocationOfPlans from '../../modules/getLocationOfPlans';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SearchPlaces from '../../../ComponentsPrajwol/screens/SearchPlaces';
import { MAPS_API_KEY } from '../../config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'; //install
import PlanCard from '../../customComponents/PlanCard';
import CustomModal from '../../customComponents/CustomModal';


const RenderPlans = ({ navigation }) => {

    const dispatch = useDispatch();

    const plans = useSelector(state => state.plan.plan);

    const [selectedPlace, setSelectedPlace] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);
    // plans.map(item => console.log(item))
    // console.log(`\n The plans are: \n${plans}\n(from render plans screen)`)

    // const [waypoints, setWaypoints] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (selectedPlace !== '') {
            console.log('Selected Place is:', selectedPlace);
        }
        if (selectedLocation !== '') {
            console.log('Selected location is:', selectedLocation);
        }
    }, [selectedPlace, selectedLocation]);

    useEffect(() => {


        if (plans.length > 0) return

        // if a plan exists in redux store that means it has already been loaded from local
        // so don't load again

        // console.log('inside use effect of plans')

        const loadLocalPlans = async () => {
            // console.log('\ntrying to dispatch the value')
            const localPlans = await AsyncStorage.getItem('plan');
            // console.log('\ninside the function')
            // console.log(`local plan is null? ${localPlans}`)
            // console.log(typeof localPlans)
            const valueToSend = JSON.parse(localPlans)
            // console.log(typeof valueToSend)
            // console.log(Array.isArray(valueToSend))

            if (localPlans !== null) {
                // console.log('\ntrying to dispatch the value')
                dispatch(loadExistingPlan(valueToSend))
                // console.log('\nafter to dispatch the value')
            }
            else {
                console.log(`local plan is null? ${localPlans}`)
            }

        };

        loadLocalPlans();

    }, []);

    useEffect(() => {

        const savePlansToLocal = async () => {
            // console.log(`\n trying to save plan data to local`)
            await AsyncStorage.setItem('plan', JSON.stringify(plans))
            const val = await AsyncStorage.getItem('plan')
            // console.log(`\nChange after trying to save is: ${val}`)

        };

        savePlansToLocal();

    }, [plans.length]);


    async function handleGoToMaps() {
        const locations = await getLocationOfPlans()
        if (locations) {
            navigation.navigate('Maps', { locations: locations, text: 'hello' })
        }

    }

    // useEffect(() => {
    //     const saveWaypointsToLocal = async () => {
    //         // Save waypoints to local storage
    //         await AsyncStorage.setItem('waypoints', JSON.stringify(waypoints));
    //         console.log('Waypoints saved to local storage:', waypoints);
    //     };

    //     saveWaypointsToLocal();
    // }, [waypoints]);

    function handleAddToPlan() {
        const payload = {
            name: selectedPlace,
            location: {
                ...selectedLocation
            }
        }
        dispatch(addToPlan(payload))
        // console.log(selectedLocation.lat)
        setModalVisible(false)
        return null
    }

    function handleViewOnMap() {

        navigation.navigate('Maps', { ...selectedLocation, title: selectedPlace })
        return null
    }

    return (
        <View >
            <StatusBar backgroundColor={COLORS.primary} />

            <GooglePlacesAutocomplete
                placeholder='Search Places to add to plan...'
                onPress={(data, details = null) => {
                    const name = data.structured_formatting.main_text;
                    const location = details.geometry.location;
                    setSelectedPlace(name);
                    setSelectedLocation({
                        latitude: parseFloat(location.latitude),
                        longitude: parseFloat(location.longitude)
                    });
                    // console.log(selectedLocation)
                    // console.log(selectedPlace);
                    setModalVisible(true)
                    // setWaypoints(prevWaypoints => [...prevWaypoints, name]);
                }}
                fetchDetails={true}
                query={{
                    key: MAPS_API_KEY,
                    language: 'en',
                    components: 'country:np',
                }}
                styles={{
                    textInput: { color: 'black' },
                    container: {
                        zIndex: 2,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                    },
                }}
            />
            <ScrollView style={styles.scrollView}>
                {

                    plans.length > 0 ? plans.map((item, index) => {

                        // return <DetectionCard key={index} classNumber={Number(item.classNumber)} fromDetection={false} />
                        return <PlanCard key={index} name={item.name} index={index + 1} deleteAction={removeFromPlan}  location={{...selectedLocation}}/>
                    })
                        : <Text style={{ color: 'black', textAlign: 'center', paddingTop: '50%' }}>Add detections to plan to view them here.</Text>
                }

                <View style={styles.scrollViewBottom}></View>

            </ScrollView>

            {/* {waypoints.length > 0 && (
                <View style={styles.selectedPlaceContainer}>
                    <Text style={styles.selectedPlaceText}>Selected Places:</Text>
                    {waypoints.map((place, index) => (
                        <Text key={index} style={styles.selectedPlaceText}>{place}</Text>
                    ))}
                </View>
            )} */}



            <Pressable style={styles.btn} onPress={handleGoToMaps}>
                <Icon name='map' color={COLORS.primary} size={30} />
                <Text style={styles.btnText}> Get Directions </Text>
            </Pressable>

            <CustomModal
                header={"Please choose an option"}
                text={`Place: ${selectedPlace}\n Distance: \n Duration`}
                title1={"Add to Plan"}
                onPress1={handleAddToPlan}
                title2={"View on Map"}
                onPress2={handleViewOnMap}
                visible={modalVisible}
                danger1={false}
                closeModal={() => setModalVisible(false)}
            />



        </View>
    )
}

export default RenderPlans

const styles = StyleSheet.create({
    btn: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        zIndex: 1,
        borderRadius: 100,
        backgroundColor: COLORS.secondary,
        padding: 5,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnText: {
        fontWeight: 'bold',
        color: COLORS.primary
    },
    scrollView: {
        minHeight: '100%',

        paddingTop: 50,

    },
    scrollViewBottom: {
        height: 70
    },
    selectedPlaceContainer: {
        padding: 10,
        backgroundColor: COLORS.secondary,
        paddingTop: 250,
        alignItems: 'center',
    },
    selectedPlaceText: {
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    modalView: {

        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '40%',

        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: "bold"
    }

})