// import React from 'react';
// import { View, Text } from 'react-native';

// const Maps = ({ route }) => {
//   // Extract the className parameter from the route
//   const { className } = route.params;

//   return (
//     <View>
//       <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>
//         Maps Screen
//       </Text>
//       <Text style={{ fontSize: 16, margin: 10 }}>
//         Received className: {className}
//       </Text>
//       {/* Add any other components or logic for your Maps screen */}
//     </View>
//   );
// };

// export default Maps;
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const Maps = ({ route }) => {
  const { className } = route.params;

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>
        Maps Screen
      </Text>
      {className ? (
        <ScrollView>
          <Text style={{ fontSize: 16, margin: 10 }}>
            Received Class Name: {className}
          </Text>
        </ScrollView>
      ) : (
        <Text style={{ fontSize: 16, margin: 10 }}>
          Map implementation text
        </Text>
      )}
      {/* Add any other components or logic for your Maps screen */}
    </View>
  );
};

export default Maps;
