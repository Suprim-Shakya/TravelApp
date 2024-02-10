import 'react-native-gesture-handler';
import React, { useRef } from 'react';
import { Pressable, StatusBar, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import IconX from 'react-native-vector-icons/MaterialCommunityIcons';

import DetailsScreen from './src/views/screens/DetailsScreen';
import HomeScreen from './src/views/screens/HomeScreen';

import RenderDetections from './src/componentsSaurav/screens/RenderDetections';
import Maps from './src/ComponentsPrajwol/screens/Maps';
import BottomDrawer from './src/componentsSaurav/screens/BottomDrawer';

import COLORS from './src/constants/colors';
import DetectionDetail from './src/components/DetectionDetail';

import { Provider } from 'react-redux'; //redux
import store from './src/componentsSaurav/redux/app/store';
import RenderBookmarks from './src/componentsSaurav/screens/BookmarkScreen/RenderBookmarks';
import ScanScreen from './src/componentsSaurav/screens/BookmarkScreen/ScanScreen';
import Bookmarks from './src/componentsSaurav/screens/BookmarkScreen/Bookmarks';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RenderPlans from './src/componentsSaurav/screens/PlanScreen/RenderPlans';
import CustomButton from './src/componentsSaurav/customComponents/CustomButton';
import OptimizedWaypointsExample from './src/ComponentsPrajwol/screens/GoogleMapScreen';
import GoogleSearch from './src/componentsSaurav/screens/GoogleSearch';
import LanguageSelectionScreen from './src/componentsSaurav/screens/LanguageSelectionScreen';


const stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();



const HomeScreenStack = () => {
	return (
		<stack.Navigator screenOptions={{ headerShown: false }}>
			<stack.Screen name='HomeScreen' component={HomeScreen} />
			<stack.Screen name='DetailsScreen' component={DetailsScreen} />
		</stack.Navigator>
	);
};

const ScanScreenStack = () => {
	return (
		<stack.Navigator screenOptions={{ headerShown: true, }}>
			<stack.Screen name='RenderDetections' component={RenderDetections} options={{ title: 'Detections', headerStyle: { backgroundColor: COLORS.primary }, headerTitleStyle: { color: 'white', fontWeight: 'bold' } }} />
			<stack.Screen name='DetectionDetail' component={DetectionDetail} options={{ headerShown: false }} />
		</stack.Navigator>
	);
};



const BookmarkScreenStack = ({ navigation }) => {
	return (
		<stack.Navigator>
			<stack.Screen name='RenderBookmarks' component={RenderBookmarks}
				options={{
					headerShown: true,
					title: "Bookmarks",
					headerStyle: { backgroundColor: COLORS.primary },
					headerTitleStyle: { color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center' },
					headerLeft: () =>
						<View style={{ marginLeft: 16 }} >
							<IconX
								name="arrow-left"
								color='white'
								size={20}
								onPress={() => navigation.goBack()}
							/>
						</View>
				}}
			/>

			<stack.Screen name='DetectionDetail' component={DetectionDetail} options={{ headerShown: false }} />
		</stack.Navigator>
	)
}
const PlanScreenStack = ({ navigation }) => {
	return (
		<stack.Navigator>
			<stack.Screen name='RenderPlans' component={RenderPlans}
				options={{
					headerShown: true,
					title: "Plans",
					headerStyle: { backgroundColor: COLORS.primary },
					headerTitleStyle: { color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center' },
					headerLeft: () =>
						<View style={{ marginLeft: 16 }} >
							<IconX
								name="arrow-left"
								color='white'
								size={20}
								onPress={() => navigation.goBack()}
							/>
						</View>
				}}
			/>

			<stack.Screen name='DetectionDetail' component={DetectionDetail} options={{ headerShown: false, headerStyle: { backgroundColor: COLORS.primary } }} />

		</stack.Navigator>
	)
}

const TabNav = ({ navigation }) => {
	const refRBSheet = useRef();
	return (<>
		<Tab.Navigator screenOptions={{
			headerShown: true,
			headerTitleAlign: 'center',
			headerStyle: {
				backgroundColor: COLORS.primary
			},
			headerTitleStyle: {
				color: 'white',
				fontWeight: 'bold',
			},
			headerLeft: () => (
				<Pressable onPress={() => navigation.openDrawer()} style={{ marginLeft: 5 }}>
					<IconX name='menu' color='white' size={30} />
				</Pressable>
			),
			tabBarActiveTintColor: COLORS.primary,
			tabBarActiveBackgroundColor: COLORS.secondary,
		}}>
			<Tab.Screen name='Home' component={HomeScreen}
				options={{

					headerTitle: "Travel Guide",
					tabBarIcon: ({ color, size }) => <Icon name='home' color={color} size={size * 1.3}
					/>
				}}
			/>
			<Tab.Screen name='Scan' component={ScanScreenStack}
				options={{
					tabBarIcon: ({ color, size }) => <Icon name='camera-alt' color={color} size={size * 1.2} />,
				}}
				listeners={() => ({
					tabPress: e => {
						e.preventDefault();
						refRBSheet.current.open();
					}
				})
				}
			/>
			<Tab.Screen name='Maps' component={Maps}
				options={{
					tabBarIcon: ({ color, size }) => <Icon name='map' color={color} size={size * 1.2} />,
					headerTitle: "Maps"
				}}
			/>
			<Tab.Screen name='Bookmarks' component={BookmarkScreenStack}
				options={{
					tabBarIcon: ({ color, size }) => <Icon name='bookmark' color={color} size={size * 1.2} />,
					headerShown: false
				}}
			/>
			<Tab.Screen name='Plan' component={PlanScreenStack}
				options={{
					headerShown: false,
					tabBarIcon: ({ color, size }) => <IconX name='clipboard-list-outline' color={color} size={size * 1.2} />
				}} />

			<Tab.Screen name='Google Maps' component={GoogleSearch}
				options={{ tabBarIcon: ({ color, size }) => <Icon name='router' color={color} size={size * 1.2} /> }} />

		</Tab.Navigator>
		<BottomDrawer refRBSheet={refRBSheet} />
	</>
	)
}


const MainStack = ({ navigation }) => {
	return (
		<stack.Navigator screenOptions={{ headerShown: false }}>
			<stack.Screen name='tab' component={TabNav}
				options={{
					// headerShown: true,
					headerTitle: 'Travel Guide',
					headerTitleAlign: 'center',
					headerStyle: {
						backgroundColor: COLORS.primary
					},
					headerTitleStyle: {
						color: 'white',
						fontWeight: 'bold',
					},
					headerLeft: () => (
						<Pressable onPress={() => navigation.openDrawer()} style={{ marginLeft: 5 }}>
							<IconX name='menu' color='white' size={30} />
						</Pressable>
					)
				}}
			/>
			<stack.Screen name='home' component={HomeScreen} />
			<stack.Screen name='DetailsScreen' component={DetailsScreen} options={{ headerShown: false }} />
			<stack.Screen name='RenderDetections' component={RenderDetections} options={{ headerShown: true, title: 'Detections', headerStyle: { backgroundColor: COLORS.primary }, headerTitleStyle: { color: 'white', fontWeight: 'bold' } }} />
			<stack.Screen name='DetectionDetail' component={DetectionDetail} options={{ headerShown: false }} />
		</stack.Navigator>
	)
}


const App = () => {

	return (//redux provider
		<Provider store={store}>

			<NavigationContainer >
				<StatusBar translucent={false} backgroundColor={COLORS.primary} />

				<Drawer.Navigator screenOptions={{ headerShown: false }}>
					{/* first one is shown by default */}
					<Drawer.Screen name='MainStack' component={MainStack} />
					<Drawer.Screen name='Bookmarks' component={BookmarkScreenStack} options={{
						drawerIcon: () => (<IconX name='bookmark' size={20} />)
					}} />
					{/* can add stack of bookmarks */}
					<Drawer.Screen name='Plan' component={PlanScreenStack} options={{
						drawerIcon: () => (<IconX name='clipboard-list-outline' size={20} />)
					}} />

					<Drawer.Screen name='Language' component={LanguageSelectionScreen} options={{
						drawerIcon: () => (<IconX name='earth' size={20} />)
					}} />

				</Drawer.Navigator>

			</NavigationContainer>
		</Provider>

	);
};


export default App;
