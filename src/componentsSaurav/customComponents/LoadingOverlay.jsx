import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React from 'react'
import COLORS from '../../constants/colors'

const LoadingOverlay = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={'large'} color={COLORS.primary} />
        </View>
    )
}

export default LoadingOverlay

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: 'center',
        alignItems: "center",
        height: "100%",
        width: "100%",
        zIndex: 5
    }
})