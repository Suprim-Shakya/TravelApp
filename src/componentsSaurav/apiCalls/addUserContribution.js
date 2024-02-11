import { Alert } from "react-native";
import { CONTRIBUTION_ENDPOINT } from "../config";
import { getAccessToken } from "../modules/handleAccessToken";

export default async function addUserContribution(formData) {

    console.log(1)
    const accessToken = await getAccessToken()
    
    if (!accessToken) return false
    try {
        const res = await fetch(CONTRIBUTION_ENDPOINT, {
            method: "POST",
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${accessToken}`
            }
        });


        const responseData = await res.json();
        console.log(responseData)
        const message = responseData.message || "Contribution added successfully!";
        if (res.ok) {
            Alert.alert("Success", `${message} \nThe place is now discoverable.`)
            return true
        } else {
            Alert.alert("Oops", `${message} \n Be sure to check places before adding.`)
            return false
        }


    } catch (error) {
        console.error("Error adding contribution:", error);
        Alert.alert("Oops!", "An error occurred while adding the contribution.");
        return false;
    }
}