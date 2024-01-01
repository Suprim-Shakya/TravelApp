import { launchCamera } from "react-native-image-picker";

import { Alert } from "react-native";

const openCamera = async () => {
    const options = {};
    try {
        const callbackFxn = async (response) => {

            if (response.didCancel) {
                return 'cancel'
            } //user didn't click image

            const formData = new FormData();
            formData.append(
                'file', {
                uri: response.assets[0].uri,
                type: response.assets[0].type,
                name: response.assets[0].fileName,
            });

            return formData
        }
        await launchCamera(options, callbackFxn);

    } catch (error) {
        console.error('Error occurred while sending image to server from camera: ', error);
        Alert.alert("Couldn't send image to server.")
    }
}

export default openCamera