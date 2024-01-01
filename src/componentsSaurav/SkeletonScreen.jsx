import { View, Text } from 'react-native'
import React from 'react'
import MyLoader from './MyContentLoader'

const SkeletonScreen = () => {

  return (
    <View style={{height:'100%', backgroundColor:'white'}}>
      <MyLoader/>
      <MyLoader/>
    </View>
  )
}

export default SkeletonScreen