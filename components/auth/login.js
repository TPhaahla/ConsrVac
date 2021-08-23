import React, { Component } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.inputStyle}
          placeholder="Email Address"
          onChangeText={(val) => this.updateInputVal(val, "emailaddress")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          onChangeText={(val) => this.updateInputVal(val, "emailaddress")}
        />
        <Button color="#3740FE" title="Login" />
      </View>
    );
  }
}
//TODO: navigate to landing page

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

export default Login;
