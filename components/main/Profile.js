import React, { Component, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../../redux/actions/index";
import MainS from "../Main";
import firebase from "firebase";
import { CheckBox } from "react-native-elements";

import { MaterialCommunityIcons } from "@expo/vector-icons";

require("firebase/firestore");
//
function Profile(props) {
  const { currentUser } = props;

  const [editFlag, setEditFlag] = useState(false);

  if (currentUser == undefined) {
    return <View></View>;
  }
  if (editFlag == false) {
    console.log(currentUser.checkedPfizer);

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            console.log(editFlag);
            setEditFlag(true);
            console.log(editFlag);
          }}
        >
          <MaterialCommunityIcons
            name="account-edit-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <Text style={styles.Text}>First names: {currentUser.displayName}</Text>
        <Text style={styles.Text}> Surname: {currentUser.surname} </Text>
        <Text style={styles.Text}> ID Number: {currentUser.idNumber} </Text>
        <Text style={styles.Text}> Email: {currentUser.email} </Text>
        <Text style={styles.Text}>
          Address: {currentUser.address.formatted_address}
        </Text>
        <Text style={styles.Text}>
          Pfizer: {currentUser.checkedPfizer.toString()}
        </Text>
        <Text style={styles.Text}>J&J: {currentUser.checkedJJ.toString()}</Text>

        <TouchableOpacity style={styles.nextBtn} onPress={() => onLogout()}>
          <Text>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (editFlag == true) {
    return (
      <View style={styles.container}>
        <Text style={styles.Text}>First names: {currentUser.displayName}</Text>
        <Text style={styles.Text}> Surname: {currentUser.surname} </Text>
        <Text style={styles.Text}> ID Number: {currentUser.idNumber} </Text>
        <Text style={styles.Text}> Email: {currentUser.email} </Text>

        <Text style={styles.Text}> Address: </Text>
        <TextInput
          style={styles.inputStyle}
          defaultValue={currentUser.address.formatted_address}
          // onChangeText={}
        />

        <CheckBox
          center
          title="Pfizer"
          checked={currentUser.checkedJJ}
          //   onPress={() => {

          //   }}
        />

        <CheckBox
          center
          title="J&J"
          checked={currentUser.checkedPfizer}
          //   onPress={() =>

          //   }
        />

        {/* <Text style={styles.Text}> Vaccine Choice: </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder={currentUser.checkedJJ.toString()}
          // onChangeText={}
        /> */}

        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => setEditFlag(false)}
        >
          <Text>SAVE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextBtn} onPress={() => onLogout()}>
          <Text>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const onLogout = () => {
  firebase.auth().signOut();
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

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
    alignItems: "center",
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
  },

  nextBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: "#427bd2",
  },
});

export default connect(mapStateToProps, null)(Profile);
