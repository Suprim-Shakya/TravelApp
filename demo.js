import 'react-native-gesture-handler';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DATABASE_ENDPOINT } from './src/componentsSaurav/config';
import COLORS from './src/constants/colors';
import filter from "lodash.filter";
import Icon from "react-native-vector-icons/MaterialIcons";

const App = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setisLoading] = useState(false);
	const [data, setdata] = useState([]);
	const [error, seterror] = useState(null);
	const [fulldata, setfulldata] = useState([]);

	useEffect(() => {
	  setisLoading(true);
	  fetchData(DATABASE_ENDPOINT);
	}, []);

	const fetchData = async (url) => {
	  setisLoading(true);
	  try {
	    const response = await fetch(url);
	    const json = await response.json();
	    setdata(json.results);
	    console.log(json.results);
	  } catch (error) {
	    seterror(error);
	    console.log(json.results);
	  }
	  setisLoading(false);
	}

	if(isLoading) {
	  return(
	    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
	    <ActivityIndicator size={'large'} color={COLORS.secondary} />
	    </View>
	  );
	}

	if(error) {
	  return(
	    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
	    <Text>Error in fetching data from the server.</Text>
	    </View>
	  );
	}

	const handleSearchQuery = (query) => {
	  setSearchQuery(query);
	  const formattedQuery = query.toLowerCase();
	  const filteredData = filter(fulldata, (className) => {
	    return contains(className, formattedQuery);
	  });
	  setfulldata(filteredData);
	};

	const contains = (className, query) => {
	  if(className.includes(query))
	  {
	    return true;
	  }
	  return false;
	}

	return (
		<SafeAreaView>
			<View style={styles.inputContainer}>
				<Icon name="search" size={28} color={COLORS.darkGrey} />
				<TextInput
					placeholder=" Search heritage"
					placeholderTextColor={COLORS.grey}
					clearButtonMode='always'
					autoCapitalize='none'
					autoCorrect={false}
					value={searchQuery}
					onChangeText={(query) => handleSearchQuery(query)}
					style={{ marginHorizontal: 10 }}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
		inputContainer: {
			height: 60,
			width: '100%',
			backgroundColor: COLORS.white,
			borderRadius: 50,
			position: 'absolute',
			top: 90,
			flexDirection: 'row',
			paddingHorizontal: 20,
			alignItems: 'center',
			elevation: 12,
		},
});

export default App;
