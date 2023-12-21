import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import HomeScreen from './src/views/screens/HomeScreen';
import DetailsScreen from './src/views/screens/DetailsScreen';
import ScanScreen from './src/views/screens/ScanScreen';
import SearchScreen from './src/views/screens/SearchScreen';
import COLORS from './src/consts/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function SubStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ScanScreen" component={ScanScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
}

const App=() => {
  return (
     <NavigationContainer>
      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.dark,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarShowLabel: false
        }}>
        <Tab.Screen name="Home" component={MainStack} options={
          tabBarIcon:
        }/>
        <Tab.Screen name="Scan" component={SubStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;