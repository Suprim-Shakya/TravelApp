import AsyncStorage from "@react-native-async-storage/async-storage";

const key = 'bookmarks'


const createData = async (value) => {
    try {
        await AsyncStorage.setItem(key, value)
        console.log(`\nStore creation successful: data is ${value}  `)
    } catch (error) {
        console.error("Error occurred while creating data :", error)
        return false
    }
    return true
}

const getSavedPlaces = async () => {
    try {
        console.log('\n1. Attempting to read data with key: ', key)
        const dataString = await AsyncStorage.getItem(key);

        if (dataString !== null){
        console.log('\n2. read data string is: ', dataString)
        const dataArray = dataString.split(',');
        console.log('\n3. Data string to array is: ', dataArray)
        return dataArray 
        } else {
            console.log(`\n2. No data is present`);
        }
    } catch (error) {
        console.error(`\n1. Error occurred while reading data with key: ${key} \n Error data:${error}`)
    }
    return null
}


const addPlace = async (value) => {
    try {

        const pastData = await AsyncStorage.getItem(key);

        if (pastData !== null) {
            //data is present
            console.log(`\n\n\n1. Attempting to add new value ${value}`)

            const dataArray = pastData.split(',')
            console.log(`\n2. Past Data array is ${dataArray}`)

            if (!dataArray.includes(value)) {

                dataArray.push(value);
    
                await AsyncStorage.setItem(key, dataArray.join(','))
    
                console.log(`\n3. New values after updating ${dataArray}`)
                return true;
            } else {
                console.log(`\n3. The item ${value} already exists`)
                return false;
            }
        }
        else {
            //old data is not present;
            console.log('\n1. Previous data array doesn\'t exist. \n  Attempting to create new one')
            const newDataArray = [value]
            await createData(newDataArray.join(','))
            return true;
        }

    } catch (error) {
        console.error("Error occurred while updating data:", error)
        return false
    }
}

const removePlace = async (value) => {
    try {

        const pastData = await AsyncStorage.getItem(key);

        let dataArray = pastData.split(',')
        console.log(`Past Data array is ${dataArray}`)

        dataArray = dataArray.filter(item => item !== String(value))
        console.log(`Existing value updated as ${dataArray}`)

        await AsyncStorage.setItem(key, dataArray.join(','))
        return true;

    } catch (error) {
        console.error("Error occurred while removing data:", error)
        return false
    }
}

const deleteAllPlaces = async () => {
    await AsyncStorage.clear();
    console.log('\n\n\nAll existing data are deleted')
}


async function init() {
    const bookmarksArray = '';
    // if data is already stored then skip
    // else create new bookmark object
    const isStoreCreated = await getSavedPlaces();

    if (isStoreCreated == null) {
        await createData('') //initialize with empty string 
    }
} // anonymous async function runs as soon as declared;
init();


export { createData, getSavedPlaces, removePlace, addPlace, deleteAllPlaces }

