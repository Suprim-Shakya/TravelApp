import { View, Pressable } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from '@react-navigation/native'
import COLORS from '../../constants/colors';

const MenuButton = () => {
    const navigation = useNavigation();
    return (
        <View
            style={{ paddingHorizontal: 16 }}
        >
            <Pressable
                onPress={() => navigation.openDrawer()}
                style={({ pressed }) => ({
                    padding: 5, // Add left padding to the icon
                    borderRadius: 20,
                    backgroundColor: pressed ? "rgba(0,0,0,0.3)" : COLORS.primary,
                })
                }>

                <Icon name='menu' color='white' size={30} />
            </Pressable>
        </View>
    )
}

export default MenuButton

    // const styles = StyleSheet.create({})
