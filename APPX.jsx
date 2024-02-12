import 'react-native-gesture-handler';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { Pressable, StatusBar, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import IconX from 'react-native-vector-icons/MaterialCommunityIcons';

// import DetailsScreen from './src/views/screens/DetailsScreen'; //suprim
// import DetailsScreen from './src/ComponentsPrajwol/screens/UserContribution/DetailsScreen';
import DetailsScreen from './src/components/DetailsScreen';
import FinalDetailsScreen from './src/components/DetectionDetail';
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
import { useTranslation } from 'react-i18next';
import ContributeScreen from './src/ComponentsPrajwol/screens/UserContribution/ContributeScreen'
import UserContributions from './src/ComponentsPrajwol/screens/UserContribution/UserContributions';


import BackButton from './src/componentsSaurav/customComponents/BackButton';
import MenuButton from './src/componentsSaurav/customComponents/MenuButton';
import RegisterPage from './src/components/RegisterPage';
import LoginPage from './src/components/LoginPage';
import { getAccessToken } from './src/componentsSaurav/modules/handleAccessToken';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import RegisterScreen from './src/components/RegisterScreen';
import LoginScreen from './src/components/LoginScreen';
import { AuthProvider, useAuth } from './src/components/AuthContext';
import CustomDrawerContent from './src/components/CustomDrawerContent';

import ActivitiesScreen from './src/ComponentsPrajwol/screens/ActivitiesScreen'
import ActivitiesDetails from './src/ComponentsPrajwol/screens/ActivitiesDetails';
import WorldHeritage from './src/ComponentsPrajwol/screens/WorldHeritage/WorldHeritage';
import SemiFinalDetailsScreen from './src/components/DetailsScreen';
import DetailsScreenCuisine from './src/views/screens/DetailsScreenCuisine';
// import { useAuth } from './src/components/AuthContext'

const stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();






const HomeScreenStack = () => {
	return (
		<stack.Navigator screenOptions={{ headerShown: false }}>
			<stack.Screen name='HomeScreen' component={HomeScreen} />
			<stack.Screen name='DetailsScreen' component={DetailsScreen} />
			<stack.Screen name='SemiFinalDetailsScreen' component={SemiFinalDetailsScreen} />
			<stack.Screen name='FinalDetailsScreen' component={FinalDetailsScreen} />

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
					headerLeft: () => <BackButton />
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
					headerLeft: () => <BackButton />
				}}
			/>

			<stack.Screen name='DetectionDetail' component={DetectionDetail} options={{ headerShown: false, headerStyle: { backgroundColor: COLORS.primary } }} />

		</stack.Navigator>
	)
}


const LanguageSelectionScreenStack = ({ navigation }) => {
	return (
		<stack.Navigator>
			<stack.Screen name='changeLanguage' component={LanguageSelectionScreen}
				options={{
					headerShown: true,
					title: "Select Language",
					headerStyle: { backgroundColor: COLORS.primary },
					headerTitleStyle: { color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center' },
					headerLeft: () => <BackButton />
				}}
			/>

			{/* TODO:make back button a custom component and add to every element necessary add paddings accordingly */}
			{/* TODO: REname main stack to home and add home icon */}

		</stack.Navigator>
	)
}
const ActivitiesScreenStack = ({ navigation }) => {
	return (
		<stack.Navigator>
			<stack.Screen name='ActivitiesScreen' component={ActivitiesScreen}
				options={{
					headerShown: true,
					title: "Activities",
					headerStyle: { backgroundColor: COLORS.primary },
					headerTitleStyle: { color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center' },
					headerLeft: () => <BackButton />
				}}
			/>
			<stack.Screen name='ActivitiesDetails' component={ActivitiesDetails}
				options={{
					headerShown: true,
					title: "Activities",
					headerStyle: { backgroundColor: COLORS.primary },
					headerTitleStyle: { color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center' },
					headerLeft: () => <BackButton />
				}}
			/>

			{/* TODO:make back button a custom component and add to every element necessary add paddings accordingly */}
			{/* TODO: REname main stack to home and add home icon */}

		</stack.Navigator>
	)
}

const LoginStack = ({ navigation }) => {
	return (
		<stack.Navigator>
			<stack.Screen name='onBoard' component={OnBoardScreen}
				options={{
					headerShown: false,
					// title: "Create an account",
					// headerStyle: { backgroundColor: COLORS.primary },
					headerTitleStyle: { color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center' },
					// headerLeft: () => <BackButton />
				}}
			/>
			<stack.Screen name='Register' component={RegisterScreen}
				options={{
					headerShown: true,
					title: "Create an account",
					headerStyle: { backgroundColor: COLORS.primary },
					headerTitleStyle: { color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center' },
					headerLeft: () => <BackButton />
				}}
			/>
			<stack.Screen name='Login' component={LoginScreen}
				options={{
					headerShown: true,
					title: "Enter your credentials",
					headerStyle: { backgroundColor: COLORS.primary },
					headerTitleStyle: { color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center' },
					headerLeft: () => <BackButton />
				}}
			/>

		</stack.Navigator>
	)
}

const ContributeScreenStack = ({ navigation }) => {
	return (
		<stack.Navigator>
			<stack.Screen name='contribute' component={ContributeScreen}
				options={{
					headerShown: true,
					title: "Make a Contribution",
					headerStyle: { backgroundColor: COLORS.primary },
					headerTitleStyle: { color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center' },
					headerLeft: () => <BackButton />
				}}
			/>



		</stack.Navigator>
	)
}

const UserContributionStack = ({ navigation }) => {
	return (
		<stack.Navigator>
			<stack.Screen name='contribute' component={UserContributions}
				options={{
					headerShown: true,
					title: "User Contributions",
					headerStyle: { backgroundColor: COLORS.primary },
					headerTitleStyle: { color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center' },
					headerLeft: () => <BackButton />
				}}
			/>



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
			headerLeft: () => <MenuButton />,
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
			{/* <Tab.Screen name='Maps' component={Maps}
				options={{
					tabBarIcon: ({ color, size }) => <Icon name='map' color={color} size={size * 1.2} />,
					headerTitle: "Maps"
				}}
			/> */}
			{/* <Tab.Screen name='Bookmarks' component={BookmarkScreenStack}
				options={{
					tabBarIcon: ({ color, size }) => <Icon name='bookmark' color={color} size={size * 1.2} />,
					headerShown: false
				}}
			/> */}
			<Tab.Screen name='Plan' component={PlanScreenStack}
				options={{
					headerShown: false,
					tabBarIcon: ({ color, size }) => <IconX name='clipboard-list-outline' color={color} size={size * 1.2} />
				}} />

			<Tab.Screen name='Maps' component={GoogleSearch}
				options={{ tabBarIcon: ({ color, size }) => <Icon name='map' color={color} size={size * 1.2} /> }} />

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
					headerLeft: () => <MenuButton />
				}}
			/>
			<stack.Screen name='home' component={HomeScreen} />
			<stack.Screen name='DetailsScreen' component={DetailsScreen} options={{ headerShown: false }} />
			<stack.Screen name='DetailsScreenCuisine' component={DetailsScreenCuisine} options={{ headerShown: false }} />
			<stack.Screen name='SemiFinalDetailsScreen' component={SemiFinalDetailsScreen} />
			<stack.Screen name='FinalDetailsScreen' component={FinalDetailsScreen} options={{ headerShown: false }} />
			<stack.Screen name='RenderDetections' component={RenderDetections} options={{ headerShown: true, title: 'Detections', headerStyle: { backgroundColor: COLORS.primary }, headerTitleStyle: { color: 'white', fontWeight: 'bold' } }} />
			<stack.Screen name='DetectionDetail' component={DetectionDetail} options={{ headerShown: false }} />
		</stack.Navigator>
	)
}


const MainApp = () => {

	// const AuthContext = createContext();

	// // const [isLoggedIn, setIsLoggedIn] = useState(false)

	// useEffect(() => {
	// 	const checkLoginStatus = async () => {
	// 		const status = await getAccessToken();
	// 		console.log(`logged in status = ${status}`)
	// 		setIsLoggedIn(status);
	// 	};

	// 	checkLoginStatus();
	// }, [])

	const { isLoggedIn } = useAuth();

	const { logout } = useAuth();
	const Logout = () => {
		logout();
	};

	return (//redux provider
		<Provider store={store}>

			<NavigationContainer >
				<StatusBar translucent={false} backgroundColor={COLORS.primary} />


				{
					!isLoggedIn ? <LoginStack /> :

						<Drawer.Navigator screenOptions={{ headerShown: false }}
							drawerContent={(props) => <CustomDrawerContent {...props} />}
						>
							{/* first one is shown by default */}
							<Drawer.Screen name='MainStack' component={MainStack} />
							<Drawer.Screen name='Bookmarks' component={BookmarkScreenStack} options={{
								drawerIcon: () => (<IconX name='bookmark' size={20} color={COLORS.placeholder} />)
							}} />
							{/* can add stack of bookmarks */}
							<Drawer.Screen name='Plan' component={PlanScreenStack} options={{
								drawerIcon: () => (<IconX name='clipboard-list-outline' size={20} color={COLORS.placeholder} />)
							}} />
							<Drawer.Screen name='Language' component={LanguageSelectionScreenStack} options={{
								drawerIcon: () => (<IconX name='earth' size={20} color={COLORS.placeholder} />)
							}} />

							<Drawer.Screen name='Contribute' component={ContributeScreenStack} options={{
								drawerIcon: () => (<IconX name='hand-heart-outline' size={20} color={COLORS.placeholder} />)
							}}
							/>
							<Drawer.Screen name='User Contributions' component={UserContributionStack} options={{
								drawerIcon: () => (<IconX name='attachment' size={20} color={COLORS.placeholder} />)
							}} />


							<Drawer.Screen name='Activities' component={ActivitiesScreenStack} options={{
								drawerIcon: () => (<IconX name='ferris-wheel' size={20} color={COLORS.placeholder} />)
							}} />
							{/* <Drawer.Screen name='WH' component={WorldHeritage} options={{
						drawerIcon: () => (<IconX name='ferris-wheel' size={20} />)
					}} /> */}
							<Drawer.Screen name='Logout' component={Logout} options={{
								drawerIcon: () => (<IconX name='logout' size={20} color={COLORS.placeholder} />)
							}} />
						</Drawer.Navigator>
				}

			</NavigationContainer>
		</Provider>

	);
};


const App = () => {
	return (
		<AuthProvider>
			<MainApp />
		</AuthProvider>
	)
}

export default App;
