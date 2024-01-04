// import React from 'react';
// import { View, Text } from 'react-native';


// const FinalDetailsScreen = ({ route }) => {
//   const { title, architectureStyle, constructedBy, description } = route.params;

//   return (
//     <View>
//       <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{title}</Text>
//       <Text>Architecture Style: {}</Text>
//       <Text>Constructed By: {}</Text>
//       <Text>Description: {}</Text>
      
//     </View>
//   );
// };

// export default FinalDetailsScreen;
import React from 'react';
import { View, Text,Image, StyleSheet } from 'react-native';

const FinalDetailsScreen = ({ route }) => {
  
  const { className ,architectureStyle,constructedBy,Ticket,Description,imageLink,constructionDate,latitude,longitude} = route.params;
  

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>{className}</Text>
      {imageLink && <Image source={{ uri: imageLink }} style={styles.image} />}
      <Text style={styles.detailText}>Detected heritage: {className}</Text>
      <Text style={styles.detailText}>Architecture Style: {architectureStyle}</Text>
      <Text style={styles.detailText}>Constructed By: {constructedBy}</Text>
      <Text style={styles.detailText}>Constructed in: {constructionDate}</Text>
      <Text style={styles.detailText}>Ticket: {Ticket}</Text>
      <Text style={styles.detailText}>Description: {Description}</Text>
      <Text style={styles.detailText}>Location: {latitude},{longitude}</Text>
      {/* Add more details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailText: {
    fontSize: 15,
    marginBottom: 8,
  },
  image: {
    width: '50%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 8,
  },
});

export default FinalDetailsScreen;
