import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import fetchDetailsFromDb from '../../componentsSaurav/apiCalls/fetchDataFromDB';

const SearchScreen = ({navigation}) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filteredData = data.filter(({ title }) =>
            title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filteredData);
    };

    async function handlePress(id) {
        const details = await fetchDetailsFromDb(parseInt(id))
        navigation.navigate("DetailsScreen", {...details})
    }

    function SearchItem({ item }) {
        return (
            <View style={styles.container}>
                <Pressable
                    style={styles.innerContainer}
                    android_ripple={{
                        radius: 350,
                        color: "rgba(0,0,0,0.3)",
                    }}
                    onPress={()=>handlePress(item.id)}
                    >
                    <Text style={styles.cardText}>{item.title || "title"}</Text>
                </Pressable>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <Icon name='search' size={32} color={"black"} style={{ position: 'absolute', left: 15, top: 15 }} />
            <TextInput
                style={styles.input}
                placeholder="Search..."
                onChangeText={handleSearch}
                value={searchQuery}
                placeholderTextColor={"gray"}
                autoFocus={true}
            />
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={SearchItem}
                style={styles.FlatList}
            />
        </View>
    );
};

const data = [
    { id: '0', title: 'Akash Bhairab Temple' },
    { id: '1', title: 'Bhagwati Temple' },
    { id: '2', title: 'Chasin Dega Temple' },
    { id: '3', title: 'Degu Talle Temple' },
    { id: '4', title: 'Dhansa Temple' },
    { id: '5', title: 'Gaddi Baithak' },
    { id: '6', title: 'Gopinath Temple' },
    { id: '7', title: 'Gorakhnath Shrine' },
    { id: '8', title: 'Hanuman Temple' },
    { id: '9', title: 'Jagannath Temple' },
    { id: '10', title: 'Kageshwor Mahadev Temple' },
    { id: '11', title: 'Kasthamandap' },
    { id: '12', title: 'Kotilingeshwar Mahadev Temple' },
    { id: '13', title: 'Kumari Ghar' },
    { id: '14', title: 'Lalitpur Bhawan' },
    { id: '15', title: 'Mahadev temple' },
    { id: '16', title: 'Mahadev Chaitya' },
    { id: '17', title: 'Mahendreshwor Mahadev Temple' },
    { id: '18', title: 'Maju Dega' },
    { id: '19', title: 'Nau Talle Durbar' },
    { id: '20', title: 'Newroad Juddha Salik' },
    { id: '21', title: 'Shivalinga Temple' },
    { id: '22', title: 'Shree Kal Bhairab' },
    { id: '23', title: 'Shree Mahalaxmi Temple' },
    { id: '24', title: 'Silyan Sata House' },
    { id: '25', title: 'Statue At Entrance' },
    { id: '26', title: 'Swet Bhairab' },
    { id: '27', title: 'Taga Gan Bell' },
    { id: '28', title: 'Taleju Bhawani Temple' },
    { id: '29', title: 'Trrailokya Mohan Narayan Temple' },
];


const styles = StyleSheet.create({
    screen: {
        backgroundColor: "white",
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        margin: 10,
        padding: 8,
        color: 'black',
        paddingLeft: 40,
        fontSize: 18
    },
    container: {
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginVertical: 2,
        height: 50,
        borderRadius: 5,
        elevation: 3,
        overflow: 'hidden'
    },
    innerContainer: {
        justifyContent: "center",
        paddingLeft: 20,
        height: "100%"
    },
    cardText: {
        color: 'black',
        fontSize: 18,
    }
});

export default SearchScreen;
