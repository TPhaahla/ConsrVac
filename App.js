import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Register2 from "./components/auth/register2";
import Landing from "./components/auth/landing";
import NotificationScreen from "./components/main/Notification";

import HomeScreen from "./components/main/Home";
import HomeAcceptedScreen from "./components/main/HomeAccepted";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
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
      <Stack.Screen name="Login" component={Login} options={{ title: "" }} />
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

      <Stack.Screen
        name="Register2"
        component={Register2}
        options={{ title: "" }}
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
