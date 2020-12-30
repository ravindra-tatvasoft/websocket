
import React, { useEffect, useState } from "react";
import {
  SafeAreaView, Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import HomeScreen from './src/screens/home/HomeScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

// export default function App() {
//   const [socket, setWebSocket] = useState(undefined)
//   useEffect(() => {
//     _handleWebSocketSetup()

//     return () => {
//       console.log('COMPONENT  unmount');
//     }
//   }, []);


//   function _handleWebSocketSetup() {
//     const socket = new WebSocket("wss://echo.websocket.org/")
//     // ws.onopen = () => {
//     //   console.log("OPEN :: ")
//     // }
//     socket.onopen = () => socket.send(new Date().toGMTString());
//     socket.onmessage = ({ data }) => {
//       console.log("Received : ", data);

//       setTimeout(() => {
//         socket.send(new Date().toGMTString());
//       }, 3000);
//     }
//     socket.onerror = (error) => { console.log("error :: ") }
//     socket.onclose = () => console.log("onclose :: ")
//     setWebSocket(socket)
//   }

//   function sendEvent() {
//     socket.send(new Date().toGMTString() + ' .. oj')
//   }
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <TouchableOpacity onPress={() => sendEvent()}>
//           <Text>ok</Text>
//         </TouchableOpacity>

//       </SafeAreaView>
//     </>
//   );
// };

export default function App1() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: true, }} initialRouteName="HomeScreen">
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

