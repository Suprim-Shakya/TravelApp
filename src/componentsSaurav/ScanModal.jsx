import { View, Text, Modal, Button } from 'react-native'
import React, { useState } from 'react'

const ScanModal = ({navigation}) => {
    const [isModalVisible, setIsModalVisible] = useState (true)
  return (
    <Modal visible={isModalVisible} onRequestClose={()=>setIsModalVisible(false)}>
        <View>
            <Text style={{color:'black'}}>This is modal</Text>
            <Button title='close modal' onPress={()=>{setIsModalVisible(false);navigation.goBack()}}/>
        </View>
    </Modal>
  )
}

export default ScanModal