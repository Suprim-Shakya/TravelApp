import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
<<<<<<< HEAD

//screens
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import HomeScreen from './src/views/screens/HomeScreen';
import DetailsScreen from './src/views/screens/DetailsScreen';
import ScanScreen from './src/views/screens/ScanScreen'
import { ScrollView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
=======
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
>>>>>>> efbf8e3c250ccb2c95e2c332b2aed8c49dabe38c

function StackNavigator(){
  return(
<<<<<<< HEAD
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
      
      {/* <Tab.Screen
        name="Notifications"
        component={updateScreen}
        options={{
          tabBarLabel: 'Updates',
        }}
      />  */}
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarLabel: 'Scan',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={StackNavigator}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
      <Tab.Screen
        name="Chat"
        component={StackNavigator}
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
=======
>>>>>>> efbf8e3c250ccb2c95e2c332b2aed8c49dabe38c
    <NavigationContainer>
      <TabNavigator /> 
     
    </NavigationContainer>
  );
};

export default App;