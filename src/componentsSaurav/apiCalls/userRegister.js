import { Alert } from "react-native";
import { REGISTER_ENDPOINT } from "../config";

export default async function userRegister(data) {

    try {

        const controller = new AbortController();
        const signal = controller.signal;

        const timer = setTimeout(() => {
            controller.abort();
        }, 30000)

        const res = await fetch(REGISTER_ENDPOINT, {
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
        const message = responseData.message || "User Registration Successful";
        if (res.ok) {
            Alert.alert("Success", `${message} \nYou can now login.`)
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
        console.error("Error registering:", error);
        Alert.alert("Oops!", "An error occurred while registering.");
        return false;
    }
}