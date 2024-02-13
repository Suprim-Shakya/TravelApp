import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import COLORS from '../../constants/colors'

const BtnGetDirections = ({ onPress, isLoading = false }) => {
    return (
        <View style={styles.container}>
            <Pressable
                onPress={onPress}
                android_ripple={{
                    foreground: true,
                    radius: 100,
                    color: "rgba(255,255,255,0.2)",
                    borderless: false,
                }}
                style={styles.content}
                disabled={isLoading}
            >
                {/* {!isLoading && <Icon name='map' color={COLORS.white} size={30} />}
                <View style={styles.loading}>
                    {isLoading ?
                        <> <Text style={styles.btnText} >Calculating</Text> <ActivityIndicator /></>
                        :
                        <Text style={styles.btnText}>Get Directions</Text>
                    }
                </View> */}

                {
                    isLoading ?
                        <View style={styles.content}>
                            <ActivityIndicator />
                            <Text style={styles.btnText}> Calculating..</Text>
                        </View>
                        :
                        <View style={styles.content}>
                            <Icon name='map' color={COLORS.white} size={30} />
                            <Text style={styles.btnText}> Get Directions</Text>
                        </View>
                }
            </Pressable>
        </View>
    )
}

export default BtnGetDirections

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: COLORS.primary,
        overflow: 'hidden',
        elevation: 5,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    content: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        height: 45
    },
    btnText: {
        fontWeight: 'bold',
        color: COLORS.white
    },
    loading: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    }
})
