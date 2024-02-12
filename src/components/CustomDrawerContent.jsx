import React from 'react';
import { View, StyleSheet,Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useAuth } from './AuthContext';
import SmallButton from '../componentsSaurav/customComponents/SmallButton';

const CustomDrawerContent = (props) => {
    const { logout } = useAuth();
    const handleLogout = () => {
        logout();
    };

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
                <Image source={require("../assets/location2.jpg")} 
                style={styles.image}
                />
                <DrawerItemList {...props} />
                <SmallButton title={"Logout"} onPress={handleLogout} />
            </View>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    image: {
        height: 150, 
        aspectRatio: 16 / 9, 
        resizeMode: "cover", 
        borderRadius: 20,
        alignSelf: 'center'
    }
});

export default CustomDrawerContent;
