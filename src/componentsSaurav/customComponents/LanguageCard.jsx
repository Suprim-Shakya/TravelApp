import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CountryFlag from "react-native-country-flag";

const LanguageCard = ({ language, code, enabled = true, onPress,current }) => {

    const styles = StyleSheet.create({
        container: {
            marginTop: 15,
            borderColor: "gray",
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: current && enabled ? 'white' : "rgba(0,0,0,0.1)",
            borderRadius: 20,
            borderWidth: 2,
            overflow: 'hidden',
        },
        content: {
            minHeight: 70,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            color: 'black',
            fontWeight: '500',
            fontSize: 20,
        },
    })

    return (
        <View style={styles.container}>
             {/* <Text>{t('greet')} </Text> */}
            <Pressable
                onPress={onPress}
                style={styles.content}
                android_ripple={enabled && {
                    foreground: true,
                    radius: 100,
                    color: "rgba(0,0,0,0.2)",
                    borderless: false,
                }}
            >

                {/* <SvgFromUri
                    width="25"
                    height="25"
                    source={{ uri: 'https://flagicons.lipis.dev/flags/4x3/np.svg' }}
                /> */}
                <CountryFlag isoCode={code} size={25} />

                <Text style={styles.text}>{language}</Text>
            </Pressable>
        </View>
    )
}


export default LanguageCard