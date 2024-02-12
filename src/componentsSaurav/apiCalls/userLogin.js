import { Alert } from "react-native";
import { LOGIN_ENDPOINT } from "../config";
import { setAccessToken } from "../modules/handleAccessToken";
import { useAuth } from "../../components/AuthContext";

export default async function userLogin(data) {

    // const accessToken = await getAccessToken()

    // if (accessToken) {
    //     console.error("access token not found")
    //     Alert.alert("Oops", "You must be logged in to contribute.")
    //     return false
    // }


    try {

        const controller = new AbortController();
        const signal = controller.signal;

        const timer = setTimeout(() => {
            controller.abort();
        }, 30000)

        const res = await fetch(LOGIN_ENDPOINT, {
            method: "POST",
            body: data.toString(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            signal: signal
        });

        clearTimeout(timer)
        const responseData = await res.json();
        console.log(responseData)
        const message = responseData.message || "logged in successfully";
        if (res.ok) {
            // Alert.alert("Success", `${message} \nYou can now contribute.`)
            await setAccessToken(responseData.data?.accessToken)
            return true
        } else {
            Alert.alert("oops", `${message}`)
            return false
        }


    } catch (error) {
        if (error.name === "AbortError") {
            Alert.alert('Timeout', 'Form submission timed out. Please try again later')
            return false;
        }
        console.error("Error adding contribution:", error);
        Alert.alert("Oops!", "An error occurred while adding the contribution.");
        return false;
    }
}