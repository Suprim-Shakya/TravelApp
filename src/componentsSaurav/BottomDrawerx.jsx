import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

const BottomDrawer = ({refRBSheet }) => {
  const navigation = useNavigation();
  return (
    <RBSheet
      ref={refRBSheet} // Pass the refRBSheet directly to the ref prop
      closeOnDragDown={true}
      closeOnPressBack={true}
      customStyles={{
        wrapper: { backgroundColor: 'rgba(0,0,0, 0.8)' },
        draggableIcon: { backgroundColor: '#000' },
      }}
    >
         {/* <Text>Hello from BottomDrawer</Text> */}
      <Button title='Open Camera' onPress={() => Alert.alert('Success', 'Button has been pressed')} />
      <Button title='Open Gallery' onPress={() => Alert.alert('Success', 'Button has been pressed')} />
      <Button title='nav ' onPress={() =>{ refRBSheet.current.close(); navigation.navigate('Maps')} }/>
      <Button title='cancel' onPress={() => refRBSheet.current.close()} />

    </RBSheet>
  );
};

export default BottomDrawer;
