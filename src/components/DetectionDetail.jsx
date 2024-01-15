import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import COLORS from '../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FinalDetailsScreen = ({ route }) => {

    const { className, architectureStyle, constructedBy, Ticket, Description, imageLink, constructionDate, latitude, longitude } = route.params;


    return (
        <View style={styles.container}>
            {/* <StatusBar translucent={true} backgroundColor="rgba(0,0,0,0.2)" /> */}
            {imageLink && <ImageBackground source={{ uri: imageLink }} style={styles.image} >
            </ImageBackground>}

            <View style={styles.headingView}>
                <Icon name="place" size={28} color={COLORS.primary} />
                <Text style={styles.headingText}>{className}</Text>
            </View>

            <View style={{ paddingHorizontal: 15 }}>
                {architectureStyle && <Text style={styles.detailText}>Architecture Style: {architectureStyle}</Text>}
                {constructedBy && <Text style={styles.detailText}>Constructed By: {constructedBy}</Text>}
                {constructionDate && <Text style={styles.detailText}>Constructed in: {constructionDate}</Text>}
                {Ticket && <Text style={styles.detailText}>Ticket: {Ticket}</Text>}
            </View>

            <ScrollView style={styles.ScrollView} >
                {Description && <Text style={styles.detailText}>Description: {Description}</Text>}
                {latitude && <Text style={styles.detailText}>Location: {latitude},{longitude}</Text>}
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    ScrollView: {
        paddingHorizontal: 15,
    },
    headingView: {
        margin: 10,
        flexDirection: 'row'
    },
    headingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    detailText: {
        fontSize: 17,
        color: COLORS.dark,
        paddingVertical: 4,
    },
    image: {
        height: 300,
        width: '100%',
    },
});

export default FinalDetailsScreen;
