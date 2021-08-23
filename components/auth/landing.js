import React, { Component } from "react";
import { View, StyleSheet, Button } from "react-native";

export class Landing extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          color="#3740FE"
          title="Login"
          onPress={() => this.props.navigation.navigate("Login")}
        />
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
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Landing;
