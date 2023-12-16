import React, { useState } from 'react';
import { View, Button, Text, Image } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const App = () => {
  const [responseMessage, setResponseMessage] = useState('');
  const [responseImageURL, setResponseImageURL] = useState('');
  const [responseName, setResponseName] = useState('');

  const openGallery = async () => {
    const options = {};

    try {
      const images = await launchImageLibrary(options);

      const formdata = new FormData();
      formdata.append('file', {
        uri: images.assets[0].uri,
        type: images.assets[0].type,
        name: images.assets[0].fileName,
      });

      await sendImageToServer(formdata);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const openCamera = async () => {
    const options = {};

    try {
      const image = await launchCamera(options);

      const formdata = new FormData();
      formdata.append('file', {
        uri: image.assets[0].uri,
        type: image.assets[0].type,
        name: image.assets[0].fileName,
      });

      await sendImageToServer(formdata);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const sendImageToServer = async (formdata) => {
    try {
      let response = await fetch('https://yoloapi.khanalsaurav.com.np/inferyolo/', {
        method: 'post',
        body: formdata,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let responseJson = await response.json();
      console.log(responseJson, 'responseJson is -----', responseJson.data.detections[0].name);

      setResponseMessage(responseJson.message);
      setResponseImageURL(responseJson.data.imageURL);
      setResponseName(responseJson.data.detections[0].name);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Button title="Upload Image" onPress={openGallery}></Button>
      <View style={{ marginVertical: 10 }} />
      <Button title="Open Camera" onPress={openCamera}></Button>

      <Text style={{color:'black'}}>{responseMessage}</Text>

      {responseImageURL && (
        <Image
          style={{ width: 400, height: 400, marginTop: 10 }}
          source={{ uri: responseImageURL }}
        />
      )}
      <Text style={{color:'black'}}>{responseName}</Text>
    </View>
  );
};

export default App;
