import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
const CustomCallout = ({ title, description, visible=true }) => {
    // const [visible, setVisible] = useState(calloutVisible)
    return (
        <View style={styles.outer}>
            {visible &&
                <View style={styles.container}>
                    <Icon name="close-circle" size={16} style={styles.close}/>
                    <Text style={styles.title}>{title}</Text>
                    {description && <Text style={styles.description}>{description}</Text>}
                </View>
            }
            <Icon name='map-marker' color={"red"} size={36} style={styles.icon} />
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
        color: 'black',
        maxWidth: 150,
    },
    description: {
        maxWidth: 150,
    },
    icon: {
        alignSelf: 'center',
    },
    close: {
        position: 'absolute',
        top: -0,
        right: -0,
    }
});

export default CustomCallout;
