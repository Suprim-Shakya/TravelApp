import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { addPlace, removePlace, getSavedPlaces, deleteAllPlaces } from '../../modules/localStore.js'

const Bookmarks = ({ navigation }) => {


  const handleAddItem = async () => {
    await addPlace('25')
      .then(response => console.log(`\n update data successful: ${response}`))
  }

  const handlePress = async () => {
    console.log(`\n\n The data are ${await getSavedPlaces()}`)
  }

  const handleDelete = async () => {
    await deleteAllPlaces();
  }

  return (
    <>
      <Button title="get stored item" onPress={handlePress} />
      <Text></Text>
      <Button title="add item" onPress={handleAddItem} />
      <Text></Text>
      <Button title="delete all" onPress={handleDelete} />
      <Text></Text>
      <Button title="bookmark screen" onPress={() => navigation.navigate('ShowPresentLocations')} />
    </>
  )
}

export default Bookmarks


const styles = StyleSheet.create({})