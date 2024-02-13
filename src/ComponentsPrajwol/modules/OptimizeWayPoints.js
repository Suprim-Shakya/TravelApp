import SortWaypoints from "./SortWaypoints";
import { getmyLocation } from "./getMyLocation";

async function OptimizeWayPoints(route) {
    console.log('incomming***********');
    route.map((item,index) => console.log(`${index}: ${item.latitude}, ${item.longitude}`))
    const{latitude : mylat,longitude: mylng}=await getmyLocation();
    console.log('I am at-----------', mylat,mylng);
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

    
    console.log('Optimized index:',optimizedWaypointsIndex);
    
    
    // const waypoints = route.slice(1, route.length - 1)
    const optimizedWayPoints = optimizedWaypointsIndex.map(item => route[item])
    console.log("\n after optimizing way points are")
    optimizedWayPoints.map((item,index) => console.log(`${index}: ${item.latitude}, ${item.longitude}`))
    // const destLoc=route[route.length-1]
    // console.log('Arriving at ',destLoc);
    // optimizedWayPoints.push(route[route.length - 1])
    // optimizedWayPoints.unshift(route[0]) //optimized route
    // console.log('Optimized waypoints:',optimizedWayPoints);
    
    return(optimizedWayPoints)
}


export default OptimizeWayPoints