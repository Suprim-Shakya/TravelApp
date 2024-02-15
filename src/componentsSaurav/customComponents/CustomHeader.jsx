import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackButton from './BackButton'
import COLORS from '../../constants/colors'

const CustomHeader = ({title}) => {
  return (
    <View style={styles.header}>
        <StatusBar backgroundColor={COLORS.primary}/>
        <BackButton/>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: 50,
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        zIndex: 5
    },
    title: {
        fontWeight: '600',
        color: 'white',
        flexGrow: 1,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 18,
        paddingRight: "20%"
    }
})