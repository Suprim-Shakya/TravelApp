import { Alert } from "react-native";
import { CONTRIBUTION_ENDPOINT } from "../config";
import { getAccessToken } from "../modules/handleAccessToken";

export default async function addUserContribution(formData) {

    const accessToken = await getAccessToken()
    
    if (!accessToken) {
        console.error("access token not found")
        Alert.alert("Oops", "You must be logged in to contribute.")
        return false
    }


    try {

        const controller = new AbortController();
        const signal = controller.signal;

        const timer = setTimeout(()=> {
            controller.abort();
        }, 30000)

        const res = await fetch(CONTRIBUTION_ENDPOINT, {
            method: "POST",
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${accessToken}`
            },
            signal: signal
        });

        clearTimeout(timer)
        const responseData = await res.json();
        // console.log(responseData)
        const message = responseData.message || "Contribution added successfully!";
        if (res.ok) {
            Alert.alert("Success", `${message} \nThe place is now discoverable.`)
            return true
        } else {
            if (res.status === 401) {
                Alert.alert("Oops", `Your Login Session has ended. \nPlease Login again to contribute.`)
                return false
            } else {

                Alert.alert("Oops", `${message} \nBe sure to check places before adding.`)
                return false
            }
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