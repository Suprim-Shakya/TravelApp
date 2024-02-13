import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import CustomModal from './CustomModal';
import COLORS from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

const PlanCard = ({ name, index, deleteAction, location}) => {
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const handleDelete = () => {
        setDeleteModalVisible(true);
    };

    const handlePlanPress = () => {
        setInfoModalVisible(true)
    }
    
    function handleViewOnMap () {
        console.log(location.latitude)
        console.log(location.longitude)
        navigation.navigate('Maps', { location: {...location}, title: name })
        setInfoModalVisible(false)
        return null
    }

    return (
        <View style={styles.container}>

            <Pressable 
            style={styles.content} 
            android_ripple={{ radius: 200, color: "rgba(0,0,0,0.2)" }}
            onPress={handlePlanPress}
            >
                <Text style={styles.text}>{index}. {name}</Text>
                <Icon
                    name='delete-forever'
                    size={25}
                    style={styles.icon}
                    color={COLORS.danger}
                    onPress={handleDelete}
                />
                <CustomModal
                    visible={deleteModalVisible}
                    text={`"${name}" will be removed from plan`}
                    title1="Ok"
                    title2="Cancel"
                    onPress1={() => {
                        dispatch(deleteAction(name));
                        setDeleteModalVisible(false);
                    }}
                    onPress2={() => setDeleteModalVisible(false)}
                    closeModal={() => setDeleteModalVisible(false)}
                    danger1={true}
                />
                <CustomModal
                    visible={infoModalVisible}
                    text={`${name}`}
                    title1="Delete"
                    // icon1={"delete"}
                    // icon2={"map"}
                    title2="View on Map"
                    onPress1={() => {
                        dispatch(deleteAction(name));
                        setInfoModalVisible(false);
                    }}
                    onPress2={handleViewOnMap}
                    closeModal={() => setInfoModalVisible(false)}
                    danger1={true}
                />
            </Pressable>
        </View>
    );
}

export default PlanCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        marginHorizontal: 10,
        marginTop: 8,
        elevation: 2,
        borderRadius: 10,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    content: {
        minHeight: 50,
        paddingHorizontal: 10,
        height: 'auto',
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
    },
    text: {
        color: "black",
        fontWeight: "500",
        flexGrow: 1,
        overflow: 'hidden',
        fontSize: 18
    },
    // icon: {
    //     backgroundColor: 'white',
    // }
});
