import React, { Component } from "react";
import { View, TextInput, StyleSheet, Button, Text } from "react-native";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchUser } from '../../redux/actions/index';
import MainS from '../Main';
import firebase from 'firebase'
require('firebase/firestore')

export class Profile extends Component {

    componentDidMount() {
        this.props.fetchUser()


    }

    render() {
        const { currentUser } = this.props;

        if (currentUser == undefined) {
            return (
                <View></View>
            )
        }
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>

                <Text>First Name: {currentUser.displayName}</Text>
                <Text>Surname: {currentUser.surname}</Text>
                <Text>ID Number: {currentUser.idNumber}</Text>
                <Text>Address: {currentUser.address}</Text>
                <Text>Vaccine Choice: {currentUser.vaccineChoice} </Text>
                <Text>Email: {currentUser.email}</Text>

                <Button
                    color="#3740FE"
                    title="Log Out"
                    onPress={() => onLogout()}
                />


            </View>
        )
    }
}
const onLogout = () => {
    firebase.auth().signOut();
}

const mapStateToProps = (store) => ({

    currentUser: store.userState.currentUser

})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Profile);
//export default Profile;
