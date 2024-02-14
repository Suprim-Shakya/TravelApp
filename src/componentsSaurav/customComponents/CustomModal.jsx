import React from 'react';
import { Modal, Text, View, StyleSheet, Pressable } from 'react-native';
import SmallButton from './SmallButton';
import COLORS from '../../constants/colors';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"


const CustomModal = ({ visible , header, text, onPress1, onPress2, title1, title2, icon1, icon2, danger1 = true, closeModal }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                // onCancel(); // Execute onCancel function if the modal is closed without selecting any option
                closeModal();
            }}
        >
            <View style={styles.container}>
                <View style={styles.view}>
                    <View style={styles.textContainer}>
                        <Text style={styles.header}>{header}</Text>
                        <Text style={styles.text}>{text}</Text>
                    </View>

                    <View style={styles.btnContainer}>
                        <SmallButton title={title1} onPress={onPress1} btnBgColor={danger1 && COLORS.danger} iconName={icon1}/>
                        <SmallButton title={title2} onPress={onPress2} iconName={icon2} />
                    </View>

                    <Pressable style={styles.icon} onPress={closeModal}>
                        <Icon name='close-circle' size={24} color={COLORS.placeholder}/>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        position: 'relative',
        
    },
    icon: {
        position: "absolute",
        right: 8,
        top: 8,
        zIndex: 2
    },
    view: {
        maxWidth: "80%",
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: 'center'
    },
    textContainer: {
        display: 'flex',
    },
    header: {
        color: 'black',
        fontWeight: "bold",
        fontSize: 18,
        alignSelf: "center",
        paddingBottom: 8
    },
    text: {
        alignSelf: "flex-start",
        color: 'black',
        fontSize: 16,
        fontWeight: "500"
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    }
})

export default CustomModal;
