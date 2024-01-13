// import React from 'react';
// import WebView from 'react-native-webview';


// const ChatBot = () => {
//     const htmlContent = `
//       <html>
//         <head>
//           <title>Travel guide chatbot</title>
//         </head>
//         <body>
//         <script src="https://cdn.botpress.cloud/webchat/v1/inject.js"></script>
//         <script src="https://mediafiles.botpress.cloud/b60b63a9-09d1-43bc-9a88-da30d5c75d36/webchat/config.js" defer></script>
//         </body>
//       </html>
//     `;
  
//     return <WebView source={{ html: htmlContent }} />;
//   };

// export default ChatBot;

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';


const MyWebComponent = () => {
  return <WebView source={{ uri: 'https://reactnative.dev/' }} style={{ flex: 1 }} />;
}

export default MyWebComponent