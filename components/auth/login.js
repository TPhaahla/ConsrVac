import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from "react-native";
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
        //this.props.navigation.navigate("Home"),
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          // prettier-ignore
          source={require("../../assets/ConsrVac_cropped.png")}
        />

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(val) => this.updateInputVal(val, "email")}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry={true}
            style={styles.inputStyle}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={(val) => this.updateInputVal(val, "password")}
          />
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.onSignIn()}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={styles.register_button}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const win = Dimensions.get("window");

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

  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },

  inputView: {
    // backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "80%",
    height: 45,
    marginBottom: 20,
    justifyContent: "center",
  },

  TextInput: {
    height: 50,
    padding: 10,
    marginLeft: 20,
  },

  register_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
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

export default Login;
