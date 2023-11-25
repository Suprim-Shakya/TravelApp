import { ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import COLORS from '../../consts/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const OnBoardScreen = ({navigation}) => {
    return(
        <View style={{flex:1}}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
            <ImageBackground
            style={{flex:1}}
            source={require('../../assets/onboardImage.jpg')}>

            <View style={styles.details}>
                <Text style={{color: COLORS.white, fontSize: 30, fontWeight: 'bold'}}>Let's Enjoy The </Text>
                <Text style={{color: COLORS.white, fontSize: 30, fontWeight: 'bold'}}>Beautiful Heritages</Text>
                <Text style={{color: COLORS.white, lineHeight: 25, marginTop: 15, fontSize:18}}>Explore new places in Nepal and gain experience.</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('HomeScreen')}>
                <View style={styles.btn}>
                    <Text style={{fontWeight: 'bold'}}>Get Started</Text>
                </View>
                </TouchableOpacity>
            </View>
            </ImageBackground>     
        </View>
    );
};

const styles = StyleSheet.create({
    details: {
        height: '45%',
        marginLeft: 10,
        bottom: 0,
        position: 'absolute',
        paddingHorizontal: 50, 
    },
    btn: {
        height: 50,
        width: 120,
        backgroundColor: COLORS.white,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    }
});

export default OnBoardScreen;