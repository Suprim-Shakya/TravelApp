import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import HomeScreen from './src/views/screens/HomeScreen';
import DetailsScreen from './src/views/screens/DetailsScreen';
import Notifications from './src/views/screens/Notifications';
import ScanScreen from './src/views/screens/ScanScreen';
import SearchScreen from './src/views/screens/SearchScreen';
import ChatScreen from './src/views/screens/ChatScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StackNavigator(){
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='DetailsScreen' component={DetailsScreen} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="ScanScreen" component={ScanScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
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
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Updates',
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarLabel: 'Scan',
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
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