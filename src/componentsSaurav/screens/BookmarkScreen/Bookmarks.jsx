import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { addPlace, removePlace, getSavedPlaces, deleteAllPlaces } from '../../modules/localStore.js'
import fetchDetailsFromDb from '../../apiCalls/fetchDataFromDB.js'

const Bookmarks = ({ navigation }) => {
  useEffect(() => {

		const fetchData = async () => {
			try {
				const result = await fetchDetailsFromDb(classNumber);
				// setRenderSkeleton(false)
                // console.log(result)
				setData(result)

			} catch (error) {
				console.error('fetching from db failed', error);
				//code to handle error in app , display some alert sth else
			}
		}

		fetchData();

		return (
			() => {
				console.log('clear use effect');
				setData(null);
				// setRenderSkeleton(true)
			}
		)

	}, [classNumber])

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

export default Bookmarks;

const styles = StyleSheet.create({})