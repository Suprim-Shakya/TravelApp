const { default: AsyncStorage } = require("@react-native-async-storage/async-storage");

async function getLocationOfPlans() {
    console.log('\n\n inside get loc of plans')
    const plans = await AsyncStorage.getItem('plan');
    const plansArray = JSON.parse(plans)
    console.log(Array.isArray(plansArray))
    // for (items of plansArray) {
    //     // console.log(plansArray[items])
    // }
    
    
    if (plans == null) {
        // console.log('null re')
        return false
    }
    else {
        const locations = [];
        
        // console.log('not')
        for (item of plansArray) {
            locations.push(item.location)
            // console.log(item.location)
        }
        console.log(locations)
        return locations

    }
}

export default getLocationOfPlans