import { API_ENDPOINT } from "../config";
import { Alert } from "react-native";

const sendImageToServer = async (formData) => {

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'post',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        const responseJson = await response.json();
        return ({ ...responseJson.data })

    } catch (error) {
        if (error.message === 'Network request failed') {
            Alert.alert('Internet unstable', 'Please check your internet connection')
        } else {
            console.error('Error occurred on post request send to server: ', error)
        }

    }
}

export default sendImageToServer