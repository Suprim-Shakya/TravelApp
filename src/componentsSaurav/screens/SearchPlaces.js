// import { View, Text } from 'react-native'
// import React from 'react'
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// const SearchPlaces = () => {
//   return (
//     <View style={{flex:1}}>
//         <View style={{width:'100%',padding:20,height:'100%'}}>
//     <GooglePlacesAutocomplete
//       placeholder='Search'
//       onPress={(data, details = null) => {
//         // 'details' is provided when fetchDetails = true
//         console.log(data, details);
//         if (details && details.geometry && details.geometry.location) {
//           const coordinates = details.geometry.location;
//           onPlaceSelected(data, details, coordinates);
//         }
//       }}
//       query={{
//         key: 'AIzaSyCZhJW9pjVyLxoZu5YZ3aApWUHIRtyxJrc',
//         language: 'en',
//       }}
//       styles={{textInput:'black'}}
//     />
//     </View>
//     </View>
//   )
// }

// export default SearchPlaces

// SearchPlaces.js


import React from 'react';
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MAPS_API_KEY } from '../config';

const SearchPlaces = ({ onPlaceSelected }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: '100%', padding: 20, height: '100%' }}>
      <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
    console.log(data, details);
    // Check if details contains geometry information
    if (details && details.geometry && details.geometry.location) {
      const selCoordinates = details.geometry.location;
      console.log('----------------');
      // console.log('Selected coordinates:', selCoordinates);
      // console.log('Selected Latitude:', selCoordinates.lat);
      // console.log('Selected Longitude:', selCoordinates.lng);
      onPlaceSelected(selCoordinates)
      // Call your callback function with the coordinates
    } else {
      console.error('No geometry information in the response');
    }
  }}
  fetchDetails={true} // Set this to true
  query={{
    key:MAPS_API_KEY,
    language: 'en',
  }}
  styles={{
    textInput: 'black',
  }}
  />

  </View>
</View>
);
};

export default SearchPlaces;




