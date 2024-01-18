import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import DetectionCard from '../../customComponents/DetectionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadExistingPlan } from "../../redux/features/planSlice";
import COLORS from '../../../constants/colors';
import CustomButton from '../../customComponents/CustomButton';
import getLocationOfPlans from '../../modules/getLocationOfPlans';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from 'react-native/Libraries/NewAppScreen';

const RenderPlans = ({ navigation }) => {

    const dispatch = useDispatch();

    const plans = useSelector(state => state.plan.plan);

    // plans.map(item => console.log(item))
    // console.log(`\n The plans are: \n${plans}\n(from render plans screen)`)

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


    return (
        <View >
            <StatusBar backgroundColor={COLORS.primary} />
            <ScrollView style={styles.scrollView}>
                {
                    plans.length > 0 ? plans.map((item, index) => {

                        return <DetectionCard key={index} classNumber={Number(item.classNumber)} fromDetection={false} />
                    })
                        : <Text style={{ color: 'black', textAlign: 'center', paddingTop: '50%' }}>Add detections to plan to  view them here.</Text>
                }
                <View style={styles.scrollViewBottom}></View>
            </ScrollView>
            <Pressable style={styles.btn}  onPress={handleGoToMaps}>
                <Icon name='map' color={COLORS.primary} size={30}/>
                <Text style={styles.btnText}> Get Directions </Text>
            </Pressable>
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
    },
    scrollViewBottom: {
        height: 70
    }
})