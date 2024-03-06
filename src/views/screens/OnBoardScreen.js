import { ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native';
import COLORS from '../../constants/colors';
import CustomButton from '../../componentsSaurav/customComponents/CustomButton';

const OnBoardScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../../assets/onboardImage.jpg')}>

                <View style={styles.content}>
                    <View style={styles.textContainer}>

                        <Text style={styles.header}>Let's Enjoy{'\n'}The Beautiful{'\n'}Heritages of Nepal</Text>
                        <Text style={styles.body}>Explore new places in Nepal and gain experience.</Text>
                    </View>


                    <View style={styles.btnContainer}>
                        <CustomButton text={"Register"} btnBgColor={COLORS.light} btnTextColor={COLORS.primary} rippleColor={'black'} fontWeight='700' fontSize={17} onPress={()=> navigation.navigate('Register')}/>
                        <CustomButton text={"Login"} btnBgColor={'white'} btnTextColor={COLORS.primary} rippleColor={'black'} fontWeight='700' fontSize={17} onPress={()=> navigation.navigate('Login')}/>
                    </View>

                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        backgroundColor: "rgba(0,0,0,0.5)",
        position: 'absolute',
        paddingLeft: 10,
        bottom: 0,
        paddingBottom: 50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: "100%"
    },
    btnContainer: {
        paddingTop: 20,
        flexDirection: "row",
        justifyContent: 'center',
        gap: 20
    },
    header: {
        color: COLORS.white,
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 10,
    },
    body: {
        color: COLORS.white,
        lineHeight: 25,
        marginTop: 15,
        fontSize: 18
    },
    textContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10
    },
});

export default OnBoardScreen;