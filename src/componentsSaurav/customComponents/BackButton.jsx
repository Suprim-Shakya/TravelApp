import { View, Pressable } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from '@react-navigation/native'
import COLORS from '../../constants/colors';

const BackButton = () => {
    const navigation = useNavigation();
    return (
        <View
            // onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: 16 }}
        >
            <Pressable
                onPress={() => navigation.goBack()}
                style={({ pressed }) => ({
                    padding: 5, // Add left padding to the icon
                    borderRadius: 20,
                    backgroundColor: pressed ? "rgba(0,0,0,0.3)" : COLORS.primary,
                })
                }>

                <Icon name='arrow-left' size={20} color={COLORS.white} />
            </Pressable>
        </View>
    )
}

export default BackButton

// const styles = StyleSheet.create({})