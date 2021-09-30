import React, { Component } from "react";
import { View, TextInput, StyleSheet, Button, Text } from "react-native";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchUser } from '../../redux/actions/index';
import MainS from '../Main';
import firebase from 'firebase'
import { render } from "react-dom";
require('firebase/firestore')
//
function Profile(props) {


    const { currentUser } = props;

    if (currentUser == undefined) {
        return (
            <View></View>
        )
    }

    return (
        <View style={styles.container}>
            
                <Text style={styles.Text}> First names: </Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder={currentUser.displayName}
                    onChangeText={(val) => this.updateInputVal(val, "displayName")}
                />
           

            
                <Text style={styles.Text}> Surname: </Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder={currentUser.surname}
                    onChangeText={(val) => this.updateInputVal(val, "surname")}
                />
           

           
                <Text style={styles.Text}> ID Number: </Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder={currentUser.idNumber}
                    onChangeText={(val) => this.updateInputVal(val, "idNumber")}
                />
            

           
                <Text style={styles.Text}> Address: </Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder={currentUser.address}
                    onChangeText={(val) => this.updateInputVal(val, "Address")}
                />
           

           
                <Text style={styles.Text}> Vaccine Choice: </Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder={currentUser.vaccineChoice}
                    onChangeText={(val) => this.updateInputVal(val, "vaccineChoice")}
                />
           

            
                <Text style={styles.Text} > Email: </Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder={currentUser.email}
                    onChangeText={(val) => this.updateInputVal(val, "Email Address")}
                />
           

           <View style={styles.cont}>
            < View style= {styles.btn}>
            
            <Button  
                color="#1E90FF"
                //color="#DCDCDC" 
                //color="#99ccff"
                title="Save"
                onPress={() => mapStateToProps()}
                //onPress={() => this.buttonClickListener()}
            />
           
            <Button
                color="#DCDCDC"
                title="Log Out"
                onPress={() => onLogout()}
            />
            
            </View>
            </View>

        </View>
    )
}


const onLogout = () => {
    firebase.auth().signOut();
}

const mapStateToProps = (store) => ({

    currentUser: store.userState.currentUser

})

const styles = StyleSheet.create({

    inputStyle: {

        marginLeft: 30,
        marginBottom: 10,
        padding: 5,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1,
        width: '30%',

    },

    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
    },

    cont: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'flex-end',  
    },

    btn: {
        width: '20%',
        height: 30,
        //alignItems: 'center',

    },

    // TextInput: {
    //     height: 20,
    //     flex: 1,
    //     padding: 5,
    //     marginLeft: 20,
    // },

    Text: {
        color: "black",
        fontWeight: "bold",
        fontSize: 12,
        height: 8,
        padding: 20,
        marginLeft: 20,

    },

});

export default connect(mapStateToProps, null)(Profile);



