import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import HomeScreen from './src/views/screens/HomeScreen';
import DetailsScreen from './src/views/screens/DetailsScreen';
import ScanScreen from './src/views/screens/ScanScreen';
import COLORS from './src/constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Notifications from './src/views/screens/Notifications';
import ScanImage from './src/componentsSaurav/ScanImage';
import Detections from './src/componentsSaurav/Detections';
import Maps from './src/componentsSaurav/Maps';

// import { useCameraPermission } from 'react-native-vision-camera';



const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
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

const StackScan = createStackNavigator();

function ScanStack() {
  return (
    <StackScan.Navigator screenOptions={{ headerShown: false }}>
      <StackScan.Screen name="ScanScreen" component={ScanImage} />
      <StackScan.Screen name="Detections" component={Detections} options={{headerShown: true}}/>
    </StackScan.Navigator>
  );
}

const App = () => {
  // const {hasPermission, requestPermission} = useCameraPermission()

  // if (!hasPermission) {
  //   requestPermission();
  // }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          // tabBarInactiveTintColor: COLORS.grey,
          tabBarLabelStyle: {
            top: -3,
            // fontWeight:'900'
          }
        }}
        initialRouteName='Scan'
      >
        <Tab.Screen
          name="Home"
          component={MainStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size * 1.2} />
            ),
          }}
        />
        {/* open camera */}
        <Tab.Screen
          name="Scan"
          component={ScanStack}
          options={{
            tabBarIcon: ({ color, size }) => (<Icon name="camera-alt" color={color} size={size * 1.2} />),
            // headerShown: true,
          }}
        />

        {/* open file explorer to take image */}
        <Tab.Screen
          name='Map'
          component={Maps}
          options={{
            tabBarIcon: ({ color, size }) => (<Icon name='map' color={color} size={size * 1.2} />)
          }}
        >
        </Tab.Screen>

      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default App;