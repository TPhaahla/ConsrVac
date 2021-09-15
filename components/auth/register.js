import React, { Component } from "react";
import { View, TextInput, StyleSheet, Button, Text } from "react-native";
import firebase from "firebase";
import { CheckBox } from "react-native-elements";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export class Register extends Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      surname: "",
      idNumber: "",
      email: "",
      password: "",
      address: "",
      checkedJJ: false,
      checkedPfizer: false,
      vaccineChoice: "",
    };
    this.onSignUp = this.onSignUp.bind(this);
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  onSignUp() {
    const { email, password, displayName, surname, idNumber, address } =
      this.state;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            displayName,
            email,
            surname,
            idNumber,
            address,
            checkedJJ,
            checkedPfizer,
          });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  registerUser = () => {};

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <TextInput
            style={styles.inputStyle}
            placeholder="Full names"
            onChangeText={(val) => this.updateInputVal(val, "displayName")}
          />
        </View>
        <View>
          <TextInput
            style={styles.inputStyle}
            placeholder="Surname"
            onChangeText={(val) => this.updateInputVal(val, "surname")}
          />
        </View>
        <View>
          <TextInput
            style={styles.inputStyle}
            placeholder="ID Number"
            onChangeText={(val) => this.updateInputVal(val, "idNumber")}
          />
        </View>
        <View>
          <TextInput
            style={styles.inputStyle}
            placeholder="Email Address"
            onChangeText={(val) => this.updateInputVal(val, "email")}
          />
        </View>
        <View>
          <TextInput
            secureTextEntry={true}
            style={styles.inputStyle}
            placeholder="Password"
            onChangeText={(val) => this.updateInputVal(val, "password")}
          />
        </View>
        <View>
          <TextInput
            style={styles.inputStyle}
            placeholder="Address"
            onChangeText={(val) => this.updateInputVal(val, "address")}
          />
        </View>

        <GooglePlacesAutocomplete
          placeholder="Address Search"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          renderDescription={(row) => row.description} // custom description render
          onPress={(data, details = null) => {
            // console.log(data);
            // console.log(details);
            this.state.address = details;
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
          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={
            {
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }
          }
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: "distance",
            types: "food",
          }}
          filterReverseGeocodingByTypes={[
            "locality",
            "administrative_area_level_3",
          ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          //predefinedPlaces={[homePlace, workPlace]}
          debounce={200}
          onChangeText={(val) => this.updateInputVal(val, "address")}
        />

        <Text>Vaccine Preference</Text>

        <CheckBox
          center
          title="Pfizer"
          checked={this.state.checkedPfizer}
          onPress={() => {
            this.setState({ checkedPfizer: !this.state.checkedPfizer });
            console.log(this.state.checkedPfizer);
          }}
        />

        <CheckBox
          center
          title="J&J"
          checked={this.state.checkedJJ}
          onPress={() =>
            this.setState({
              checkedJJ: !this.state.checkedJJ,
              vaccineChoice: "J&J",
            })
          }
        />

        <Button
          color="#3740FE"
          title="Next"
          onPress={() => {
            this.onSignUp();
            this.props.navigation.navigate("Home");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default Register;
