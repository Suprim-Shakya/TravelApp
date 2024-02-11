import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setAccessToken(accessToken) {
    try {
        await AsyncStorage.setItem("accessToken", accessToken);
        return true;
    } catch (error) {
        console.log("Error setting access token:", error);
        return false; // Indicate failure
    }
}

export async function getAccessToken() {
    try {
        const value = await AsyncStorage.getItem("accessToken");
        if (value !== null) {
            return value;
        } else {
            return false; // Indicate token not found
        }
    } catch (error) {
        console.log("Error retrieving access token:", error);
        return false; // Indicate failure
    }
}
