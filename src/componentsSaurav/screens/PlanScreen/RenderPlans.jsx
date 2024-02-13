import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView } from 'react-native-virtualized-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToPlan, loadExistingPlan, removeFromPlan } from "../../redux/features/planSlice";
import COLORS from '../../../constants/colors';
import getLocationOfPlans from '../../modules/getLocationOfPlans';
import PlanCard from '../../customComponents/PlanCard';
import SearchBar from '../../customComponents/SearchBar';
import BtnGetDirections from '../../customComponents/BtnGetDirections';
import OptimizeWayPoints from '../../../ComponentsPrajwol/modules/OptimizeWayPoints';
import openMap from 'react-native-open-maps';
import { PureWaypointsConverter } from '../../../ComponentsPrajwol/modules/PureWaypointsCoverter';



const RenderPlans = ({ navigation }) => {

    const dispatch = useDispatch();
    const plans = useSelector(state => state.plan.plan);

    // const [selectedPlace, setSelectedPlace] = useState('');
    // const [selectedLocation, setSelectedLocation] = useState(null);
    // const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     if (selectedPlace !== '') {
    //         console.log('Selected Place is:', selectedPlace);
    //     }
    //     if (selectedLocation !== '') {
    //         console.log('Selected location is:', selectedLocation);
    //     }
    // }, [selectedPlace, selectedLocation]);


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
            // const val = await AsyncStorage.getItem('plan')
            // console.log(`\nChange after trying to save is: ${val}`)

        };

        savePlansToLocal();

    }, [plans.length]);


    // useEffect(() => {
    //     // console.log("inside use effect")
    //     if (selectedPlace !== '' && selectedLocation !== null) {
    //         setModalVisible(true);
    //         // console.log("inside use effect")
    //     }
    // }, [selectedPlace, selectedLocation]);


    // async function handleGetDirections() {
    //    console.log('Hello');
    //    const {latitude,longitude}=await getmyLocation();
    //    console.log('You are standing at',latitude,longitude);
    // }

    async function handleGetDirections() {
        try {
            console.log('============================================================================');
            const locations = await getLocationOfPlans();
            const destination = locations[locations.length-1]

            let pureWaypoints;
    
            if (locations.length < 3) {
                pureWaypoints = PureWaypointsConverter(locations);
            } else {
                // Pass optimized_locations to PureWaypointsConverter
                const optimized_locations = await OptimizeWayPoints(locations);
                console.log('Optimized ============:', optimized_locations);
                
                pureWaypoints = PureWaypointsConverter(optimized_locations);
                dest=locations[locations.length-1];
                console.log('Dest is ',dest);
                // pureDestination=pureDestinationConverter(dest);
                // console.log(pureDestination)
                
                console.log('Pure waypoints:',pureWaypoints);
                
                // // console.log('Pure dest:',pureDestination);
                // console.log('Yo chai dest:',pureWaypoints[pureWaypoints.length - 1],);
                
            }
    
            openMap({
                travelType: 'drive',
                // start: pureWaypoints[0],
                end: `${destination.latitude},${destination.longitude}`,//zoo
                // waypoints: pureWaypoints.slice(0, pureWaypoints.length - 1),
                waypoints: pureWaypoints,
                travelMode: 'driving',
                navigate_mode: 'navigate',
                // region: routeData,
            });
            // openMap({
            //     travelType: 'drive',
            //     // start: pureWaypoints[0],
            //     end: pureWaypoints[pureWaypoints.length - 2],
            //     waypoints: pureWaypoints.slice(0, pureWaypoints.length - 2),
            //     travelMode: 'driving',
            //     navigate_mode: 'navigate',
            //     // region: routeData,
            // });
        } catch (error) {
            console.error('Error:', error);
        }
    }


    // function handleAddToPlan() {
    //     const payload = {
    //         name: selectedPlace,
    //         location: {
    //             ...selectedLocation
    //         }
    //     }
    //     dispatch(addToPlan(payload))
    //     // console.log(selectedLocation.lat)
    //     setModalVisible(false)
    //     return null
    // }

    // function handleViewOnMap() {
    //     // console.log("inside")
    //     navigation.navigate('Maps', { location: { ...selectedLocation }, title: selectedPlace })
    //     setModalVisible(false)
    //     return null
    // }

    function handlePressSearch() {
        navigation.navigate("Maps")
    }

    return (
        <View >
            <StatusBar backgroundColor={COLORS.primary} />

            <SearchBar text={"Search and add to plan..."} onPress={handlePressSearch} />

            <ScrollView style={styles.scrollView}>
                {

                    plans.length > 0 ? plans.map((item, index) => {

                        // return <DetectionCard key={index} classNumber={Number(item.classNumber)} fromDetection={false} />
                        return <PlanCard key={index} name={item.name} index={index + 1} deleteAction={removeFromPlan} location={{ ...item.location }} />
                    })
                        : <Text style={{ color: 'black', textAlign: 'center', paddingTop: '50%' }}>Add detections to plan to view them here.</Text>
                }

                <View style={styles.scrollViewBottom}></View>

            </ScrollView>

            <BtnGetDirections onPress={handleGetDirections} isLoading={loading} />

            {/* <CustomModal
                header={"Please choose an option"}
                text={`Place: ${selectedPlace}\n Distance: \n Duration`}
                title1={"Add to Plan"}
                onPress1={handleAddToPlan}
                title2={"View on Map"}
                onPress2={handleViewOnMap}
                visible={modalVisible}
                danger1={false}
                closeModal={() => setModalVisible(false)}
            /> */}

        </View>
    )
}

export default RenderPlans

const styles = StyleSheet.create({

    scrollView: {
        minHeight: '100%',
        // marginBottom: 80
    },
    scrollViewBottom: {
        height: 150
    },
})