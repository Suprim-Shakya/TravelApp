import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import COLORS from '../../../constants/colors';

const ContributeScreen = () => {
  const [name, setName] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [hasTicket, setHasTicket] = useState(false);
  const [description, setDescription] = useState('');



  const handleSave = () => {
    // You can perform any actions with the input values here
    console.log('Name:', name);
    console.log('Coordinates:', coordinates);
    console.log('Has Ticket:', hasTicket);
    console.log('Description:', description);
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Contribute </Text>
      
      <View style={{ marginBottom: 10 }}>
        
        <TextInput
        placeholder='Name of the place'
          style={{ borderColor: 'gray', borderWidth: 1, padding: 8 }}
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>

      <View style={{ marginBottom: 10 }}>
        
        <TextInput
        placeholder='Coordinates'
          style={{ borderColor: 'gray', borderWidth: 1, padding: 8 }}
          value={coordinates}
          onChangeText={text => setCoordinates(text)}
        />
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text>Ticket:</Text>
        
      </View>

      <View style={{ marginBottom: 10 }}>
        
        <TextInput
        placeholder='Description'
          style={{ borderColor: 'gray', borderWidth: 1, padding: 8, height: 100 ,textAlignVertical: 'top'}}
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={text => setDescription(text)}
        />
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleSave}>
        <Text style={styles.btnTxt}>Contribute</Text>
    </TouchableOpacity>
    </ScrollView>
  );
};

export default ContributeScreen;

const styles=StyleSheet.create({
btn:{
    backgroundColor: COLORS.primary, // Use your preferred color
          padding: 10,
          alignItems: 'center',
          borderRadius: 5,
},
btnTxt:{
    color:COLORS.white,
},
})


