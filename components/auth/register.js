import React, { Component } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";

export class Register extends Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      surname: "",
      idNumber: "",
      email: "",
      password: "",
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  registerUser = () => {};

  render() {
    return (
      <View>
        <TextInput
          style={styles.inputStyle}
          placeholder="Full names"
          onChangeText={(val) => this.updateInputVal(val, "displayName")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Surname"
          onChangeText={(val) => this.updateInputVal(val, "surname")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="ID Number"
          onChangeText={(val) => this.updateInputVal(val, "idNumber")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Email Address"
          onChangeText={(val) => this.updateInputVal(val, "email")}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.inputStyle}
          placeholder="Password"
          onChangeText={(val) => this.updateInputVal(val, "password")}
        />
        <Button
          color="#3740FE"
          title="Register"
          onPress={() => {
            alert("RegistrationComplete");
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
