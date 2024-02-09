import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
const CustomCallout = ({ title, description }) => {
    const [visible, setVisible] = useState(true)
    return (
        <View style={styles.outer}>
            {visible &&
                <View style={styles.container}>
                    <Icon name="close-circle" size={24} style={styles.close} onPress={() => { setVisible(false); console.log("pressed") }} />
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            }
            <Icon name='map-marker' color={"red"} size={36} style={styles.icon} onPress={() => setVisible(true)} />
        </View>
    );
};

const styles = StyleSheet.create({
    outer: {
        display: 'flex'
    },
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        position: 'relative',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black'
    },
    description: {
        maxWidth: 150,
    },
    icon: {
        alignSelf: 'center',
    },
    close: {
        position: 'absolute',
        top: -5,
        right: -5,
    }
});

export default CustomCallout;
