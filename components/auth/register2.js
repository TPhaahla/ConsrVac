import React, { Component } from "react";
import { View, TextInput, StyleSheet, Button, Text } from "react-native";
import { CheckBox } from "react-native-elements";
import Geocoder from "react-native-geocoding";
import { Constants } from "expo";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export class Register2 extends Component {
  constructor() {
    super();
    this.state = {
      address: "",
      vaccineChoice: "",
      ready: false,
      where: { lat: null, lng: null },
      error: null,
      checkedJJ: false,
      checkedPfizer: false,
    };
  }

  //   componentDidMount() {
  //     this.revGeoCode();
  //     let geoOptions = {
  //       enableHighAccuracy: true,
  //       timeOut: 20000,
  //       maximumAge: 60 * 60,
  //     };
  //     navigator.geolocation.getCurrentPosition(
  //       this.geoSuccess,
  //       this.geoFailure,
  //       geoOptions
  //     );
  //     this.setState({ ready: false, error: null });
  //   }

  //   _attemptReverseGeocodeAsync = async () => {
  //     this.setState({ inProgress: true });
  //     try {
  //       let result = await Location.reverseGeocodeAsync(
  //         this.state.selectedExample
  //       );
  //       this.setState({ result });
  //     } catch (e) {
  //       this.setState({ error: e });
  //     } finally {
  //       this.setState({ inProgress: false });
  //     }
  //   };

  //   revGeoCode = () => {
  //     Geocoder.init("AIzaSyDBnviSdzXQ_oXfR93VxXs3_Q5kjgB2huU");
  //     console.log(
  //       Geocoder.from({ latitude: -33.9598393, longitude: 18.4773018 })
  //     );
  //   };

  revGeoCode = () => {
    console.log("method called");
    Location.setGoogleApiKey("AIzaSyDBnviSdzXQ_oXfR93VxXs3_Q5kjgB2huU");
    Location.reverseGeocodeAsync({
      latitude: -33.9598393,
      longitude: 18.4773018,
    });
  };

  geoSuccess = (position) => {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    this.setState({
      ready: true,
      where: { lat: position.coords.latitude, lng: position.coords.longitude },
    });
  };

  geoFailure = (err) => {
    this.setState({ error: err.message });
  };

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  registerUser = () => {};

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GooglePlacesAutocomplete
          placeholder="Address Search"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          renderDescription={(row) => row.description} // custom description render
          onPress={(data, details = null) => {
            console.log(data);
            console.log(details);
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
        {/* <TextInput
          style={styles.inputStyle}
          placeholder="Address"
          onChangeText={(val) => this.updateInputVal(val, "address")}
        />*/}

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
          onPress={() => this.setState({ checkedJJ: !this.state.checkedJJ })}
        />

        <Button
          color="#3740FE"
          title="Register"
          onPress={() => {
            alert("RegistrationComplete");
            this.props.navigation.navigate("Home");
            console.log(this.state.address);
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

export default Register2;
