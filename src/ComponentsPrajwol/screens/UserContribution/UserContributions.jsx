// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// import fetchUserContribution from './fetchUserContribution'

// async function handleFetchUserContribution(){
//     // console.log('PRessed contriv');
//     const contribDetails= await fetchUserContribution();
//     console.log("Inside SCreen");
//     console.log(contribDetails);
// }
// const UserContributions = () => {
//   return (
//     <View>
//       <TouchableOpacity onPress={handleFetchUserContribution}>
//         <Text>Fetch details</Text>
//       </TouchableOpacity>
//     </View>
//   )
// }

// export default UserContributions

// const styles = StyleSheet.create({})

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import fetchUserContribution from './fetchUserContribution';

const UserContributions = () => {
  const [contribDetails, setContribDetails] = useState(null);

  const handleFetchUserContribution = async () => {
    try {
      const details = await fetchUserContribution();
      setContribDetails(details);
    } catch (error) {
      console.error('Error fetching user contributions:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleFetchUserContribution}>
        <Text>Fetch details</Text>
      </TouchableOpacity>

      {contribDetails && contribDetails.documents && (
        <View>
          <Text>Names:</Text>
          {contribDetails.documents.map((item) => (
            <Text key={item.id}>{item.Name}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default UserContributions;

const styles = StyleSheet.create({});
