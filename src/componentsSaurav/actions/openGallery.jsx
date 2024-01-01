import { Alert } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
const openGallery = async () => {
    try {

        const callbackFxn = async (response) => {

            if (response.didCancel) {
                return 'cancel'
            } //user didn't select image


            const formData = new FormData();
            formData.append(
                'file', {
                uri: response.assets[0].uri,
                type: response.assets[0].type,
                name: response.assets[0].fileName,
            });

            return formData
        }
        await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, callbackFxn);

    } catch (error) {
        console.error('Error occurred while sending image to server from gallery: ', error);
        Alert.alert("Couldn't send image to server.")
    }
}

export default openGallery