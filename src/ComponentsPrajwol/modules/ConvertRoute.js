
const ConvertRoute = (route) => {

    const result = route.map((item) => {
        return `${item.latitude},${item.longitude}`
    })
  
    return result
  }
  
  export default ConvertRoute