import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fetchUserContribution from './fetchUserContribution';
import { ScrollView } from 'react-native-virtualized-view';
import FinalDetailsScreen from '../../../components/DetectionDetail';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';


const UserContributions = () => {
  const [contribDetails, setContribDetails] = useState(null);
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  function toggleRefresh() {
    setRefresh(v => !v)
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("start")
        console.log("start")
        setRefreshing(true);
        const details = await fetch("https://travelguide.khanalsaurav.com.np/api/v1/contribution/all");
        const result = await details.json();
        // console.log(JSON.stringify(result.data, null, 2)); 
        setContribDetails(result.data);
        setRefreshing(false);
        console.log("end")
      } catch (error) {
        console.error('Error fetching user contributions:', error);
        setRefreshing(false);
      }
    };
    
    fetchData();
  }, [refresh]);

  const navigateToDetails = (item) => {
    const { location } = item;
const [latitude, longitude] = location.split(',').map(coord => coord.trim());

// console.log(latitude,longitude);


    navigation.navigate('DetailsScreen', {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      ...item,
      className: item.name // to show on map
    });

  };

  function DetailCard({item}) {
    return (
      <TouchableOpacity
              key={item._id}
              style={styles.card}
              onPress={() => navigateToDetails(item)}
            >
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
              {/* {console.log(JSON.stringify(item, null, 2))} */}
            </TouchableOpacity>
    )
  }


  function ListEmpty(){
    return (
      <Text style={styles.text}>No contributions are available. {'\n'} Pull Down to refresh</Text>
    )
  }

  function ListFooter(){
    return (
      <Text style={styles.text}>End of the list</Text>
    )
  }

  return (
    // <ScrollView>
    //   {contribDetails  && (
    //     <View>
    //       {contribDetails.map((item) => (
    //         <TouchableOpacity
    //           key={item._id}
    //           style={styles.card}
    //           onPress={() => navigateToDetails(item)}
    //         >
    //           <Image source={{ uri: item.imageUrl }} style={styles.image} />
    //           <Text style={styles.name}>{item.name}</Text>
    //           {console.log(item)}
    //         </TouchableOpacity>
    //       ))}
    //     </View>
    //   )}
    // </ScrollView>
    <FlatList
    data = {contribDetails}
    renderItem={DetailCard}
    keyExtractor={item => item._id}
    initialNumToRender={3}
    // ListFooterComponent={istFooter}
    ListEmptyComponent={ ListEmpty}
    onRefresh={toggleRefresh}
    refreshing={refreshing}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={toggleRefresh} />}
    />
  );
};

export default UserContributions;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: '#ffffff',
    margin: 15,
    // padding: 10,
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 2
  },
  image: {
    width: '100%',
    height: 200,
    // borderRadius: 8,
    // marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    margin: 10

  },
  text: {
    textAlign: "center",
    color: "black",
    fontSize: 16,
    paddingVertical: 20
  }
});
