import {  Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';

const CustomButton = ({ text, onPress, iconName, iconSize, iconColor, btnBgColor, btnTextColor }) => {

    const styles = StyleSheet.create({
        button: {
            backgroundColor: COLORS.primary,
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
            overflow: 'hidden'
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
            android_ripple={{
                foreground: true, 
                radius:100, 
                color:"rgba(255,255,255,0.2)",
                borderless: false,
            }}
        >
            {iconName && <Icon name={iconName} size={iconSize ? iconSize : 24} color={iconColor ? iconColor : 'white'} />}
            <Text style={[styles.text, btnTextColor && { color: btnTextColor }]}> {text}</Text>
        </Pressable>
    )
}

export default CustomButton