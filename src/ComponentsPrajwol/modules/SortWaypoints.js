import { MAPS_API_KEY } from "../../componentsSaurav/config";


const SortWaypoints = async (origin, waypoints, destination) => {
    // console.log('User location 0:',origin)
    // console.log('User location 1:',...waypoints)
    // console.log('User location 2:',destination)

    try {
        const response = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': MAPS_API_KEY,
                'X-Goog-FieldMask': 'routes.optimizedIntermediateWaypointIndex',
            },
            body: JSON.stringify({
                origin: origin,
                intermediates: waypoints,
                destination: destination,
                travelMode: 'DRIVE',
                optimizeWaypointOrder: true,
                routingPreference: 'TRAFFIC_AWARE',
            }),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response}`);
        }
        
        const data = await response.json();
        const sortedIndex = data.routes[0].optimizedIntermediateWaypointIndex
        // console.log(sortedIndex)
        return sortedIndex;

    } catch (error) {
        console.error('Error fetching optimized waypoints:', error.message);
        return [];
    }
};


export default SortWaypoints