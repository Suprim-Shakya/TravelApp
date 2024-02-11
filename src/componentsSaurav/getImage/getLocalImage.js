import { launchImageLibrary } from 'react-native-image-picker'

export default async function getLocalImage() {
    const options = {
        mediaType: "photo",
        selectionLimit: 1
    }

    const response = await launchImageLibrary(options)
    if (response.didCancel) return false

    const imageFile = {
        uri: response.assets[0].uri,
        type: response.assets[0].type, // Mime type of the image
        name: response.assets[0].fileName, // Name of the file
    };

    return { imageFile, uri: response.assets[0].uri }

}