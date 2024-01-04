import React, { useRef } from 'react';
import { Button } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DetailsScreen from './src/views/screens/DetailsScreen';
import RenderDetections from './src/componentsSaurav/screens/RenderDetections';
import HomeScreen from './src/views/screens/HomeScreen';
import Maps from './src/componentsSaurav/screens/Maps';
import BottomDrawer from './src/componentsSaurav/screens/BottomDrawer';

import RBSheet from 'react-native-raw-bottom-sheet';
import SkeletonScreen from './src/componentsSaurav/customComponents/SkeletonScreen';

const HomeStack = createStackNavigator();

const HomeScreenStack = () => {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name='HomeScreen' component={HomeScreen} />
            <HomeStack.Screen name='DetailsScreen' component={DetailsScreen} />
        </HomeStack.Navigator>
    );
};

// const BottomDrawer = ({ refRBSheet }) => {
//     return (
//         <RBSheet ref={refRBSheet} closeOnDragDown={true} closeOnPressBack={true} customStyles={{ wrapper: { backgroundColor: 'rgba(0,0,0, 0)' }, draggableIcon: { backgroundColor: "#000" } }}>
//             {/* <Button title='Open Camera' onPress={() => { openCamera }} />
//             <Button title='Open Gallery' onPress={openGallery} /> */}
//             <Button title='Cancel' onPress={() => refRBSheet.current.close()} />
//         </RBSheet>
//     )
// }

const ScanStack = createStackNavigator();

const ScanScreenStack = ({ navigation }) => {
    const refRBSheet = useRef();

    return (
        <ScanStack.Navigator screenOptions={{ headerShown: true }}>
            {/* <ScanStack.Screen name='BottomDrawer'  component={BottomDrawer} /> */}
            <ScanStack.Screen name='RenderDetections' component={RenderDetections}  options={{title:'Detections'}}/>
            <ScanStack.Screen name='Skeleton' component={SkeletonScreen}  options={{ title:'Loading Detections...'}}/>
        </ScanStack.Navigator>
    );
};

const App = () => {
    const Tab = createBottomTabNavigator();
    const refRBSheet = useRef();
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen
                    name='Home'
                    component={HomeScreenStack}
                    options={{
                        tabBarIcon: ({ color, size }) => <Icon name='home' color={color} size={size * 1.2} />,
                    }}
                />
                <Tab.Screen
                    name='Scan'
                    component={ScanScreenStack} // this is prevented by listeners
                    // initialParams={{openDrawer: ()=> refRBSheet.current.open()}}
                    options={{
                        tabBarIcon: ({ color, size }) => <Icon name='camera-alt' color={color} size={size * 1.2} />,
                    }}
                listeners={() => ({
                    tabPress: e => {
                        e.preventDefault();
                        refRBSheet.current.open();
                    }
                })}
                />
                <Tab.Screen
                    name='Maps'
                    component={Maps}
                    options={{ tabBarIcon: ({ color, size }) => <Icon name='map' color={color} size={size * 1.2} /> }}
                />
            </Tab.Navigator>
            <BottomDrawer refRBSheet={refRBSheet} />
        </NavigationContainer>
    );
};


export default App;
