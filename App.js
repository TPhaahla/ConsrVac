import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Landing from "./components/auth/landing";
import NotificationScreen from "./components/main/Notification";

import HomeScreen from "./components/main/Home";
import HomeAcceptedScreen from "./components/main/HomeAccepted";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDdUOKPliBYk8MYKbBOmudOaZMLOjsD1SU",
  authDomain: "consrvacmobileapp.firebaseapp.com",
  projectId: "consrvacmobileapp",
  storageBucket: "consrvacmobileapp.appspot.com",
  messagingSenderId: "642600149527",
  appId: "1:642600149527:web:454ee003d430347663f252",
  measurementId: "G-GKMGF0ZV5F",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading...</Text>
        </View>
      );
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: "" }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ title: "" }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#3740FE",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          >
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ title: "" }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: "" }}
            />
            <Stack.Screen
              name="Landing"
              component={Landing}
              options={{ title: "" }}
            />

            <Stack.Screen
              name="Notification"
              component={NotificationScreen}
              options={{ title: "" }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "" }}
            />
            <Stack.Screen
              name="HomeAccepted"
              component={HomeAcceptedScreen}
              options={{ title: "" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
}
export default App;

// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyStack />
//     </NavigationContainer>
//   );
// }
