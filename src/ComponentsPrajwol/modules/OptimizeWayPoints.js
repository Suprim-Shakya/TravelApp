import SortWaypoints from "./SortWaypoints";
import { getmyLocation } from "./getMyLocation";

async function OptimizeWayPoints(route) {

    // const route = [
    //     { "latitude": 27.6915087, "longitude": 85.29590329999999 },

    //     { "latitude": 27.6587525, "longitude": 85.3247183 },
    //     { "latitude": 27.672704, "longitude": 85.3118294 },
    //     { "latitude": 27.6636478, "longitude": 85.31814519999999 },
    //     { "latitude": 27.69917217030569, "longitude": 85.29695607495043 },
    //     { "latitude": 27.6771166, "longitude": 85.3170766 },
    //     { "latitude": 27.701377, "longitude": 85.32039809999999 },
    //     { "latitude": 29.2037534, "longitude": 81.2268809 },
        
    //     { "latitude": 27.7509152, "longitude": 85.34558349999999 }
    // ]
    // console.log('Optimizing...',route);
    const{latitude : mylat,longitude: mylng}=await getmyLocation();
    // console.log("Starting From",mylat,mylng)
    const origin_google_format = {
            location: {
                latLng: {
                    latitude: mylat,
                    longitude: mylng,
                },
            },
        };

    const waypoints_google_format = route.map(waypoint => {
        return {
            location: {
                latLng: {
                    latitude: waypoint.latitude,
                    longitude: waypoint.longitude,
                },
            },
        };
    });

    const optimizedWaypointsIndex = await SortWaypoints(
        origin_google_format,
        waypoints_google_format.slice(0, waypoints_google_format.length - 1),
        waypoints_google_format[waypoints_google_format.length - 1]
    )
    
    // console.log('Optimized index:',optimizedWaypointsIndex);
   
    

    // const waypoints = route.slice(1, route.length - 1)
    const optimizedWayPoints = optimizedWaypointsIndex.map(item => route[item])
    optimizedWayPoints.push(route[route.length - 1])
    // optimizedWayPoints.unshift(route[0]) //optimized route
    // console.log('Optimized waypoints:',optimizedWayPoints);
    
    return(optimizedWayPoints)
}


export default OptimizeWayPoints