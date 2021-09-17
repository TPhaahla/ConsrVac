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


            <Button

                color="#1E90FF"
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



const styles = StyleSheet.create({

    inputStyle: {

        marginLeft: 30,
        marginBottom: 10,
        padding: 10,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1,

    },

    container: {
        flex: 1,
        backgroundColor: "#fff",

        justifyContent: "center",
    },


    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    Text: {

        color: "black",
        fontWeight: "bold",
        fontSize: 12,
        height: 15,
        flex: 1,
        padding: 20,
        marginLeft: 20,

    }
});

export default connect(mapStateToProps, null)(Profile);



