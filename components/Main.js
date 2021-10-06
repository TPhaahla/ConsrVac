import React, { Component } from "react";
import { View, TextInput, StyleSheet, Button, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions/index";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./main/Home";
import ProfileScreen from "./main/Profile";
import NotificationScreen from "./main/Notification";
import waitListScreen from "./main/waitlinglist";


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Bottom Tab Navigator for easy navigation of application pages from within the application.
const Tab = createBottomTabNavigator();

export class Main extends Component {

    componentDidMount() {
        this.props.fetchUser()



    }
    //render the necessary components for each type of user.
    //The healthcare worker and the vaccine recipient should not be accessing the same parts of the application.
    render() {

        const { currentUser } = this.props;

        if (currentUser == undefined) {
            return (<View>
                <Text>User Not Defined</Text>
            </View>)
        }

        if (currentUser.userType == "staff") {
            return (
                //Bottom tab navigator has icons and acts as a navigation menu
                <Tab.Navigator initialRouteName="waitinglist">


                    <Tab.Screen name="WaitingList" component={waitListScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="card-text" color={color} size={26} />
                            )
                        }} />
                    <Tab.Screen name="Profile" component={ProfileScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                            )
                        }} />


                </Tab.Navigator>
            )
        }
        else
            return (


                <Tab.Navigator initialRouteName="Home">


                    <Tab.Screen name="Profile" component={ProfileScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                            )
                        }} />
                    <Tab.Screen name="Home" component={HomeScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="home" color={color} size={26} />
                            )
                        }} />
                    <Tab.Screen name="Notification" component={NotificationScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="bell-ring" color={color} size={26} />
                            )
                        }} />




                </Tab.Navigator>
            )
    }
}

//needed to update props to reflect the state as per the fetchUsers() method in the redux functions.
const mapStateToProps = (store) => ({

    currentUser: store.userState.currentUser

})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);


