import 'react-native-gesture-handler';
import { useRef } from 'react';
import { StatusBar } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Provider } from 'react-redux'; //redux
import store from './src/componentsSaurav/redux/app/store';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthProvider, useAuth } from './src/components/AuthContext';

import MenuButton from './src/componentsSaurav/customComponents/MenuButton';
import BackButton from './src/componentsSaurav/customComponents/BackButton';

import DetailsScreen from './src/components/DetailsScreen';
import RegisterScreen from './src/components/RegisterScreen';
import LoginScreen from './src/components/LoginScreen';

import RenderDetections from './src/componentsSaurav/screens/RenderDetections';
import BottomDrawer from './src/componentsSaurav/screens/BottomDrawer';
import RenderBookmarks from './src/componentsSaurav/screens/BookmarkScreen/RenderBookmarks';
import RenderPlans from './src/componentsSaurav/screens/PlanScreen/RenderPlans';
import GoogleSearch from './src/componentsSaurav/screens/GoogleSearch';
// import LanguageSelectionScreen from './src/componentsSaurav/screens/LanguageSelectionScreen';

import ContributeScreen from './src/ComponentsPrajwol/screens/UserContribution/ContributeScreen'
import UserContributions from './src/ComponentsPrajwol/screens/UserContribution/UserContributions';
import ActivitiesScreen from './src/ComponentsPrajwol/screens/ActivitiesScreen'

import HomeScreen from './src/views/screens/HomeScreen';
import COLORS from './src/constants/colors';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import SearchScreen from './src/views/screens/SearchScreen';
// import { useTranslation } from 'react-i18next';


const stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


const LoginStack = () => {
	return (
		<stack.Navigator
			ScreenOptions={{
				headerShown: true,
				headerStyle: { backgroundColor: COLORS.primary },
				headerTitleStyle: { color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center' },
				// headerLeft: () => <BackButton />
			}}
		>
			<stack.Screen name='onBoard' component={OnBoardScreen} options={{ headerShown: false }} />
			<stack.Screen name='Register' component={RegisterScreen} options={{ title: "Create an account" }} />
			<stack.Screen name='Login' component={LoginScreen} options={{ title: "Enter your credentials" }} />
		</stack.Navigator>
	)
}


const TabNav = () => {
	const refRBSheet = useRef();
	return (<>
		<Tab.Navigator
			screenOptions={{
				headerShown: false, headerTitleAlign: 'center',
				headerStyle: { backgroundColor: COLORS.primary },
				headerTitleStyle: { color: 'white', fontWeight: '600', },
				// headerLeft: () => <MenuButton />,
				tabBarActiveTintColor: COLORS.primary, tabBarActiveBackgroundColor: COLORS.secondary,

			}}>
			<Tab.Screen name=' ' component={HomeScreen}
				options={{ headerShown: false, headerTitle: "Travel Guide", tabBarIcon: ({ color, size }) => <Icon name='home' color={color} size={size * 1.3} /> }} />
			<Tab.Screen name='Scan' component={RenderDetections}
				options={{ tabBarIcon: ({ color, size }) => <Icon name='camera' color={color} size={size * 1.2} /> }}
				listeners={() => ({ tabPress: e => { e.preventDefault(); refRBSheet.current.open(); } })} />
			<Tab.Screen name='Plan' component={RenderPlans}
				options={{ headerTitle: "Plans", tabBarIcon: ({ color, size }) => <Icon name='clipboard-list-outline' color={color} size={size * 1.2} /> }} />
			<Tab.Screen name='Maps' component={GoogleSearch}
				options={{ headerShown: false, headerTitle: "Maps", tabBarIcon: ({ color, size }) => <Icon name='map' color={color} size={size * 1.2} /> }} />
		</Tab.Navigator>
		<BottomDrawer refRBSheet={refRBSheet} />
	</>
	)
}


const MainStack = () => {
	return (
		<stack.Navigator
			screenOptions={{
				headerShown: true,
				headerTitleAlign: 'center',
				headerStyle: { backgroundColor: COLORS.primary },
				headerTitleStyle: { color: 'white', fontWeight: '600', },
				headerMode: 'float',
				headerShadowVisible: "false",
				headerTintColor: "white",
				// header
				headerShadowVisible: false,
				headerMode: 'float'
			}}
		>
			<stack.Screen name='tab' component={TabNav}
				options={
					({ route }) => ({ headerTitle: getFocusedRouteNameFromRoute(route) ?? "Travel Guide", headerLeft: () => <MenuButton /> })
				}
			/>
			<stack.Screen name='RenderDetections' component={RenderDetections}
				options={{ title: 'Detections' }} />
			<stack.Screen name='DetailsScreen' component={DetailsScreen} />
			<stack.Screen name='Maps' component={GoogleSearch} />
			<stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerTitle: "Search" }} />
		</stack.Navigator>
	)
}


const MainApp = () => {

	const { isLoggedIn, logout } = useAuth();
	const Logout = () => { logout() };

	// const {t} = useTranslation();

	return (
		<NavigationContainer >
			<StatusBar translucent={false} backgroundColor={COLORS.primary} />
			{
				!isLoggedIn ? <LoginStack /> :
					<Drawer.Navigator
						screenOptions={{
							headerShown: true, headerTitleAlign: 'center',
							headerStyle: { backgroundColor: COLORS.primary }, headerTitleStyle: { color: 'white', fontWeight: '600', },
							tabBarActiveTintColor: COLORS.primary, tabBarActiveBackgroundColor: COLORS.secondary,
							// drawerLabelStyle: { fontSize: 17 },
							headerLeft: () => <MenuButton />,
							drawerActiveTintColor: COLORS.primary
						}}>
						<Drawer.Screen name='MainStack' component={MainStack}
							options={{
								drawerLabelStyle: { fontSize: 18, fontWeight: 'bold' },
								headerShown: false, drawerLabel: "Home",
								drawerIcon: () => (<Icon name='home' size={28} color={COLORS.placeholder} />)
							}} />
						<Drawer.Screen name='Bookmarks' component={RenderBookmarks}
							options={{ drawerIcon: () => (<Icon name='bookmark' size={24} color={COLORS.placeholder} />) }} />
						{/* <Drawer.Screen name={t('Language')} component={LanguageSelectionScreen}
							options={{ drawerIcon: () => (<Icon name='earth' size={24} color={COLORS.placeholder} />) }} /> */}
						<Drawer.Screen name='Contribute' component={ContributeScreen}
							options={{ drawerIcon: () => (<Icon name='hand-heart-outline' size={24} color={COLORS.placeholder} />) }} />
						<Drawer.Screen name='User Contributions' component={UserContributions}
							options={{ drawerIcon: () => (<Icon name='attachment' size={24} color={COLORS.placeholder} />) }} />
						<Drawer.Screen name='Activities' component={ActivitiesScreen}
							options={{ drawerIcon: () => (<Icon name='ferris-wheel' size={24} color={COLORS.placeholder} />) }} />
						<Drawer.Screen name='Logout' component={Logout}
							options={{ drawerIcon: () => (<Icon name='logout' size={24} color={COLORS.placeholder} />) }} />
					</Drawer.Navigator>
			}
		</NavigationContainer>

	);
};



const App = () => {
	return (
		<AuthProvider>
			<Provider store={store}>
				<MainApp />
			</Provider>
		</AuthProvider >
	)
}

export default App;
