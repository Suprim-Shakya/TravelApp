export default async function calculateDistanceDuration(origin, destination, mode = "driving") {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.latitude},${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&mode=${mode}&key=AIzaSyCL05Qyt9d9tmnFeC4rjaJNbaSqN1tIRjw`;

    // console.log("[calculate Distance Duration] The data I received is: ", origin);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log('[calculate Distance Duration] Data from API:', data.rows[0].elements);
        const distanceText = data.rows[0].elements[0].distance.text;
        const durationText = data.rows[0].elements[0].duration.text;
        console.log(distanceText);
        console.log(durationText);
        return { distanceText, durationText };
    } catch (error) {
        console.error('[calculate Distance Duration] Error fetching distance matrix:', error);
        return false
    }
}

