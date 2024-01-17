import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { MAPS_API_KEY } from '../config';

const App = () => {
  const [placeName, setPlaceName] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [aqi, setAqi] = useState(null);

  const googleMapsApiKey = MAPS_API_KEY;
  const aqiApiKey = 'YOUR_AQI_API_KEY';

  const getPlaceDetails = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${placeName}&inputtype=textquery&fields=geometry&key=${googleMapsApiKey}`
      );
      const data = await response.json();
      const location = data.candidates[0].geometry.location;
      setLatitude(location.lat);
      setLongitude(location.lng);
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const getAqi = async () => {
    try {
      const response = await fetch(
        `https://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${aqiApiKey}`
      );
      const data = await response.json();
      const aqiValue = data.data.current.pollution.aqius;
      setAqi(aqiValue);
    } catch (error) {
      console.error('Error fetching AQI:', error);
    }
  };

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      getAqi();
    }
  }, [latitude, longitude]);

  return (
    <View>
      <TextInput
        placeholder="Enter place name"
        value={placeName}
        onChangeText={text => setPlaceName(text)}
      />
      <Button title="Get Location" onPress={getPlaceDetails} />
      {latitude !== null && longitude !== null && (
        <View>
          <Text>Latitude: {latitude}</Text>
          <Text>Longitude: {longitude}</Text>
        </View>
      )}
      {aqi !== null && <Text>Air Quality Index: {aqi}</Text>}
    </View>
  );
};

export default App;
