import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'
import { updateData, removeItem, readData, deleteAll} from '../modules/localStore.js'

const Bookmarks = () => {

  const handleAddItem = async () => {
    await updateData('25')
    .then(response => console.log(`\n update data successful: ${response}`))
  }

  const handlePress = async() => {
    console.log(`\n\n The data are ${await readData()}`)
  }

  const handleDelete = async () => {
    await deleteAll();
  }

  return (
    <>
    <Button title="get stored item" onPress={handlePress}/>
    <Text></Text>
    <Button title="add item" onPress={handleAddItem}/>
    <Text></Text>
    <Button title="delete all" onPress={handleDelete}/>
    </>
  )
}

export default Bookmarks

const styles = StyleSheet.create({})