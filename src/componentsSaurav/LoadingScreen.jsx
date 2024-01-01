import { View, Text } from 'react-native'
import React from 'react'
import MyLoader from './MyContentLoader'

const LoadingScreen = () => {
  return (
    <View>
      <MyLoader/>
      <MyLoader/>
    </View>
  )
}

export default LoadingScreen