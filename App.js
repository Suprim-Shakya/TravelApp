

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import HomeScreen from './src/views/screens/HomeScreen';
import DetailsScreen from './src/views/screens/DetailsScreen';
import ScanScreen from './src/views/screens/ScanScreen';
import COLORS from './src/consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Notifications from './src/views/screens/Notifications';
import ScanImage from './src/componentsSaurav/ScanImage';

const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown:false}}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="DetailsScreen" component={DetailsScreen} />
      <HomeStack.Screen name="Notifications" component={Notifications} />
    </HomeStack.Navigator>
  );
}

// function Draw(){
//   return(
//     <Drawer.Navigator drawerContent={() => <DrawerItems />}>
//         <Drawer.Screen name="Profile" component={ProfileScreen} />
//         <Drawer.Screen name="Settings" component={SettingsScreen} />
//         {/* Add more screens */}
//       </Drawer.Navigator>
//   )
// }

const StackScan=createStackNavigator();

function ScanStack() {
  return (
    <StackScan.Navigator screenOptions={{headerShown:false}}>
      <StackScan.Screen name="ScanScreen" component={ScanImage}/>
    </StackScan.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.dark,
          tabBarInactiveTintColor: COLORS.grey,
        }}
        initialRouteName='Scan'
      >
        <Tab.Screen
          name="Home"
          component={MainStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Scan"
          component={ScanStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="search" color={color} size={size} />
            ),
            headerShown:false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default App;