import { launchImageLibrary } from 'react-native-image-picker'

export default async function getLocalImage() {
    const options = {
        mediaType: "photo",
        selectionLimit: 1
    }

    const result = await launchImageLibrary(options)
    if (result.didCancel) return false
    return result.assets[0].uri
}