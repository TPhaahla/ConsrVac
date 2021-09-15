import React, { Component } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import firebase from "firebase";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };

    this.onSignIn = this.onSignIn.bind(this);
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  onSignIn() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.props.navigation.navigate("Home"), console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
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
        <Button color="#3740FE" title="Login" onPress={() => this.onSignIn()} />

        <Button
          color="#3740FE"
          title="Register"
          onPress={() => this.props.navigation.navigate("Register")}
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
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Login;
