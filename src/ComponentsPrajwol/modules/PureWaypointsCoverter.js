export function PureWaypointsConverter(inputs){
  
    
    const pureFormat = inputs.map((item)=> {
        return `${item.latitude},${item.longitude}`
    })

        // console.log('Pure format',pureFormat)
        return pureFormat
}