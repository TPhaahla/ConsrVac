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
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { MaterialCommunityIcons } from "@expo/vector-icons";

require("firebase/firestore");

function Profile(props) {
  const { currentUser } = props;

  const [editFlag, setEditFlag] = useState(false);

  const [checkedPfizer, setCheckedPfizer] = useState(currentUser.checkedPfizer);
  const [checkedJJ, setCheckedJJ] = useState(currentUser.checkedJJ);
  const [address, setAddress] = useState(currentUser.address);

  // var checkedPfizer = currentUser.checkedPfizer;
  // var checkedJJ = currentUser.checkedJJ;

  if (currentUser == undefined) {
    return <View></View>;
  }
  if (editFlag == false) {
    // console.log(firebase.auth.currentUser.uid);

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
        {/* <Text style={styles.Text}>First names: {currentUser.displayName}</Text>
        <Text style={styles.Text}> Surname: {currentUser.surname} </Text>
        <Text style={styles.Text}> ID Number: {currentUser.idNumber} </Text>
        <Text style={styles.Text}> Email: {currentUser.email} </Text> */}

        {/* <TextInput
          style={styles.inputStyle}
          defaultValue={currentUser.address.formatted_address}
          // onChangeText={}
        /> */}

        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.Text}> Address: </Text>
          <GooglePlacesAutocomplete
            placeholder={currentUser.address.formatted_address}
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed="auto" // true/false/undefined
            fetchDetails={true}
            renderDescription={(row) => row.description} // custom description render
            onPress={(data, details = null) => {
              setAddress(details);
              console.log(this.state.address);
            }}
            getDefaultValue={() => {
              return ""; // text input default value
            }}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: "AIzaSyDBnviSdzXQ_oXfR93VxXs3_Q5kjgB2huU",
              language: "en", // language of the results
              components: "country:za",
              //types: "(cities)", // default: 'geocode'
            }}
            styles={{
              description: {
                fontWeight: "bold",
              },
              predefinedPlacesDescription: {
                color: "#1faadb",
              },
            }}
            currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
            nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={
              {
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }
            }
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: "distance",
            }}
            filterReverseGeocodingByTypes={[
              "locality",
              "administrative_area_level_3",
            ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            //predefinedPlaces={[homePlace, workPlace]}
            debounce={200}
            onChangeText={(val) => this.updateInputVal(val, "address")}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <CheckBox
            center
            title="Pfizer"
            checked={checkedPfizer}
            onPress={() => {
              setCheckedPfizer(!checkedPfizer);
              console.log(checkedPfizer);
            }}
          />

          <CheckBox
            center
            title="J&J"
            checked={checkedJJ}
            onPress={() => {
              setCheckedJJ(!checkedJJ);
              console.log(checkedJJ);
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => {
            onUpdate(address, checkedJJ, checkedPfizer);
            setEditFlag(false);
            console.log(currentUser.displayName);
          }}
        >
          <Text>SAVE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const onLogout = () => {
  firebase.auth().signOut();
};

const onUpdate = (newAddress, JJ, Pfizer) => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({ address: newAddress, checkedJJ: JJ, checkedPfizer: Pfizer });
  fetchUser();
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
