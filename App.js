import { StatusBar } from "expo-status-bar";
import React, { Component, useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

import Login from "./components/auth/login";
import Register from "./components/auth/register";

import MainScreen from "./components/Main.js";

import HomeScreen from "./components/main/Home";


import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import firebase from "firebase";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
import { user } from "./redux/reducers/user";


const store = createStore(rootReducer, applyMiddleware(thunk));

//firebase config api key to allow for this application to access the database
const firebaseConfig = {
  apiKey: "AIzaSyDdUOKPliBYk8MYKbBOmudOaZMLOjsD1SU",
  authDomain: "consrvacmobileapp.firebaseapp.com",
  projectId: "consrvacmobileapp",
  storageBucket: "consrvacmobileapp.appspot.com",
  messagingSenderId: "642600149527",
  appId: "1:642600149527:web:454ee003d430347663f252",
  measurementId: "G-GKMGF0ZV5F",
};

//ensure that no other instance of this firebase application is running which could result in conflicts and incorrect database files being read.
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export class App extends Component {

  // store the application state variables from the props
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  //moount component so that the state of components can be rendered and changed whilst the application is running
  //need to ensure the user is logged in so they can access the correct part of the application.
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
  //render the components that make up the front end of the application and reference to redux.
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
      //LoginScreen or homepage for when users are not logged in.
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
    }
    else {
      //reference to redux which manages state of user details.
      return (
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{ title: "" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>




      );
    }
  }
}
export default App;

