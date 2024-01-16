import React, { useRef } from 'react';
import { StatusBar } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import IconX from 'react-native-vector-icons/MaterialCommunityIcons';

import DetailsScreen from './src/views/screens/DetailsScreen';
import HomeScreen from './src/views/screens/HomeScreen';

import RenderDetections from './src/componentsSaurav/screens/RenderDetections';
import Maps from './src/componentsSaurav/screens/Maps';
import BottomDrawer from './src/componentsSaurav/screens/BottomDrawer';

import COLORS from './src/constants/colors';
import DetectionDetail from './src/components/DetectionDetail';

import { Provider } from 'react-redux'; //redux
import store from './src/componentsSaurav/redux/app/store';
import RenderBookmarks from './src/componentsSaurav/screens/BookmarkScreen/RenderBookmarks';


const HomeStack = createStackNavigator();
const HomeScreenStack = () => {
	return (
		<HomeStack.Navigator screenOptions={{ headerShown: false }}>
			<HomeStack.Screen name='HomeScreen' component={HomeScreen} />
			<HomeStack.Screen name='DetailsScreen' component={DetailsScreen} />
		</HomeStack.Navigator>
	);
};


const ScanStack = createStackNavigator();
const ScanScreenStack = ({ navigation }) => {
	const refRBSheet = useRef();

	return (
		<ScanStack.Navigator screenOptions={{ headerShown: true, }}>
			<ScanStack.Screen name='RenderDetections' component={RenderDetections} options={{ title: 'Detections', headerStyle: {backgroundColor: COLORS.primary} ,headerTitleStyle: {color: 'white', fontWeight: 'bold'} }} />
			<ScanStack.Screen name='DetectionDetail' component={DetectionDetail} options={{ headerShown: false }} />
		</ScanStack.Navigator>
	);
};


const BookmarkStack = createStackNavigator();
const BookmarkScreenStack = ({navigation}) => {
	return(
		<BookmarkStack.Navigator>
			<BookmarkStack.Screen name ='RenderBookmarks' component={RenderBookmarks} options={{headerShown: true, title: "Bookmarks", headerStyle: {backgroundColor: COLORS.primary} ,headerTitleStyle: {color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center'}}}/>
		</BookmarkStack.Navigator>
	)
}


const App = () => {
	const Tab = createBottomTabNavigator();
	const refRBSheet = useRef();
	return (//redux provider
	<Provider store={store}> 
		<NavigationContainer >
			<StatusBar translucent={false} backgroundColor={COLORS.primary} />
			<Tab.Navigator screenOptions={{
				headerShown: false,
				tabBarStyle: {
					height: 60
				},
				tabBarHideOnKeyboard: true,
				tabBarActiveTintColor: COLORS.primary,
				tabBarLabelStyle: {
					top: -10,
					fontWeight: 'bold'
				}
			}} >
				<Tab.Screen
					name='Home'
					component={HomeScreenStack}
					options={{
						tabBarIcon: ({ color, size }) => <Icon name='home' color={color} size={size * 1.3} />,
					}}
					/>
				<Tab.Screen
					name='Scan'
					component={ScanScreenStack} // this is prevented by listeners
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

				<Tab.Screen
					name='Bookmarks'
					component={BookmarkScreenStack}
					options={{ tabBarIcon: ({ color, size }) => <IconX name='bookmark' color={color} size={size * 1.2} /> }}
					/>
			</Tab.Navigator>
			<BottomDrawer refRBSheet={refRBSheet} />
		</NavigationContainer>
	</Provider>
	);
};


export default App;
