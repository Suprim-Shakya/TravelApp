import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import HomeScreen from './src/views/screens/HomeScreen';
import DetailsScreen from './src/views/screens/DetailsScreen';
import COLORS from './src/consts/colors';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StackNavigator(){
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='DetailsScreen' component={DetailsScreen} />
      </Stack.Navigator>
  );
}

function TabNavigator(){
  return(
    <Tab.Navigator screenOptions={{headerShown: false}}>
       <Tab.Group
    screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={StackNavigator}
        options={{
          tabBarLabel: 'Home',
          
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={StackNavigator}
        options={{
          tabBarLabel: 'Updates',
          
        }}
      />
    </Tab.Group>
    </Tab.Navigator>
  )
}

const App = () => {
  return(
    <NavigationContainer>
      <TabNavigator /> 
     
    </NavigationContainer>
  );
};

export default App;