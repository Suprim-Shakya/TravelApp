import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialIcons"
import COLORS from '../../constants/colors'

const SearchBar = ({ text, onPress }) => {
    return (
        <View style={styles.container}>
            <Pressable
                style={styles.content}
                onPress={onPress}
                android_ripple={{
                    foreground: true,
                    radius: 200,
                    color: "rgba(0,0,0,0.2)",
                    borderless: false,
                }}
            >
                <Icon name='search' size={24} color={COLORS.placeholder}/>
                <Text style={styles.text}>{text || "Search..."}</Text>
            </Pressable>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        // maxWidth: "100%",
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 8,
        backgroundColor: 'white',
        elevation: 5,
        overflow: 'hidden'
    },
    content: {
        minHeight: 45,
        paddingLeft: 10,
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    text: {
        color:COLORS.placeholder
    }
})
