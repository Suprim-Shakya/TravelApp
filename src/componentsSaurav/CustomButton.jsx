import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomButton = ({ text, onPress, iconName, iconSize, iconColor, btnBgColor, btnTextColor }) => {
    const [isPressed, setIsPressed] = useState(false);

    const styles = StyleSheet.create({
        button: {
            opacity: isPressed ? 0.7 : 1,
            backgroundColor: 'black',
            color: 'white',
            borderRadius: 100,
            width: 160,
            height: 50,
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 3,
            alignSelf: 'center',
            margin: 10,
        },
        text: {
            color: 'white',
            fontSize: 16,
        }
    })
    return (
        <Pressable
            onPress={onPress}
            style={[styles.button, btnBgColor && { backgroundColor: btnBgColor }]}
            onPressIn={()=>setIsPressed(true)}
            onPressOut={()=>setIsPressed(false)}
        >
            {iconName && <Icon name={iconName} size={iconSize ? iconSize : 24} color={iconColor ? iconColor : 'white'} />}
            <Text style={[styles.text, btnTextColor && { color: btnTextColor }]}> {text}</Text>
        </Pressable>
    )
}

export default CustomButton