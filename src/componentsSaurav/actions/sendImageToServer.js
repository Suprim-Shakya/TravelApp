import { Alert } from "react-native";
import { API_ENDPOINT } from "../config";
const sendImageToServer = async (formData) => {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'post',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        // if (!response.ok) {
        //     throw new Error(`HTTP error! Status: ${response.status}`);
        // }

        const responseJson = await response.json();
        // handleDetection({ ...responseJson.data })
        // navigation.navigate('Detections', { ...detectionData })
        return {...responseJson.data}
        // console.log(responseJson)
        // setResponse(responseJson.message);
        // setResponseImageURL(responseJson.data.imageURL);
        // responseJson.data.detections[0] ? setResponseName(responseJson.data.detections[0].name) : setResponseName('No detections')

    } catch (error) {
        if (error.message === 'Network request failed') {
            Alert.alert('Internet unstable', 'Please check your internet connection')
        } else {
            console.error('Error occurred on post request send to server: ', error)
        }

    } 
}

export default sendImageToServer