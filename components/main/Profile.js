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
                <View>
                    <Text> First names: </Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder= {currentUser.displayName}
                        onChangeText= {(val) => this.updateInputVal(val, "displayName")}
                    />
                </View>
                
                <View>
                    <Text> Surname: </Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder= {currentUser.surname}
                        onChangeText= {(val) => this.updateInputVal(val, "surname")}
                    />
                </View>

                <View>
                    <Text> ID Number: </Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder= {currentUser.idNumber}
                        onChangeText= {(val) => this.updateInputVal(val, "idNumber")}
                    />
                </View>

                <View>
                    <Text> Address: </Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder= {currentUser.address}
                        onChangeText= {(val) => this.updateInputVal(val, "Address")}
                    />
                </View>

                <View>
                    <Text> Vaccine Choice: </Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder= {currentUser.vaccineChoice}
                        onChangeText= {(val) => this.updateInputVal(val, "vaccineChoice")}
                    />
                </View>

                <View>
                    <Text> Email: </Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder= {currentUser.email}
                        onChangeText= {(val) => this.updateInputVal(val, "Email Address")}
                    />
                </View>

                {/* <Text>Surname: {currentUser.surname}</Text>
                <Text>ID Number: {currentUser.idNumber}</Text>
                <Text>Address: {currentUser.address}</Text>
                <Text>Vaccine Choice: {currentUser.vaccineChoice} </Text>
                <Text>Email: {currentUser.email}</Text> */}

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


const styles = StyleSheet.create({
    inputStyle: {
      width: "100%",
      marginBottom: 15,
      paddingBottom: 15,
      alignSelf: "center",
      borderColor: "#ccc",
      borderBottomWidth: 1,
    },
  
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  
  
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
    },
});

export default connect(mapStateToProps, mapDispatchProps)(Profile);
//export default Profile;


