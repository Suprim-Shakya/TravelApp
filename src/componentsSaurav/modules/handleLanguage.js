import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getLanguage() {
    try {
        const language = await AsyncStorage.getItem("language")
        // console.log("language retrieved from local : ", language)
        if (language !== null) {
            return language
        }
        // else {return 'en'}
    } catch (error) {
        console.error("Error occurred while retrieving language: ", error)
        return false
    }
}

export async function setLanguage(language) {
    try {
        AsyncStorage.setItem("language", language);
        // console.log("language changed in local to : ", language)
        return true;
    } catch (error) {
        console.error("Error occurred while setting language: ", error)
        return false;
    }
}