import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Landing from "./components/auth/landing";
import NotificationScreen from './components/main/Notification';
import Home from "./components/main/Home";
import HomeScreen from './components/main/Home';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

function MyStack() {
  return (
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
        options={{ title: "Register" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={({ title: "Landing" })}
      />

      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={({ title: "Notification" })}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ title: "Home" })}
      />

     <Stack.Screen
        name="Home"
       component={Home}
       options={({ title: "Home"}, { headerLeft: null })}
      /> 

    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
