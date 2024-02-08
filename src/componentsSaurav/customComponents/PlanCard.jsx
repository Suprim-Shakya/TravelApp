import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import CustomModal from './CustomModal';
import COLORS from '../../constants/colors';

const PlanCard = ({ name, index, deleteAction }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = () => {
        setModalVisible(true);
    };

    return (
        <View style={styles.view}>
            <Text style={styles.text}>{index}. {name}</Text>
            <Icon
                name='delete-forever'
                size={25}
                style={styles.icon}
                color={COLORS.danger}
                onPress={handleDelete}
            />
            <CustomModal
                visible={modalVisible}
                text={`${name} will be removed from plan`}
                title1="Ok"
                title2="Cancel"
                onPress1={() => {
                    dispatch(deleteAction(name));
                    setModalVisible(false);
                }}
                onPress2={() => setModalVisible(false)}
                closeModal={() => setModalVisible(false)}
                danger1={true}
            />
        </View>
    );
}

export default PlanCard;

const styles = StyleSheet.create({
    view: {
        minHeight: 50,
        backgroundColor: "white",
        marginHorizontal: 10,
        marginTop: 8,
        paddingHorizontal: 10,
        elevation: 2,
        borderRadius: 10,
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
    icon: {
        backgroundColor: 'white'
    }
});
