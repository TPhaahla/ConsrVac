import React, { Component } from "react";
import { View, TextInput, StyleSheet, Button, Text } from "react-native";

export class HomeAccepted extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "Vaccine available",
      bodyText: "Reference code: DA57JSGSS",
      centre: "Vaccine centre: Newlands",
      pos: "",
      //proceedButtonDisabled: false,
    };
  }

  onPressTitle() {
    this.setState({
      titleText: "Vaccine available",
      bodyText: "Reference code: DA57JSGSS",
      centre: "Vaccine centre: Newlands",
      pos: "",
      //ProceedButton:"false",
    });
  }

  buttonClickListener = () => {
    this.setState({
      bodyText: "Reference code: DA57JSGSS",
      centre: "Vaccine centre: Newlands",
    });
  };

  render() {
    return (
      <View style={s.container}>
        <Text style={styles.baseText}>
          <Text style={styles.titleText} onPress={this.onPressTitle}>
            {this.state.titleText}
            {"\n"}
            {"\n"}
          </Text>

          <Text numberOfLines={5}> {this.state.bodyText}</Text>
          {"\n"}
          {"\n"}
          <Text numberOfLines={5}> {this.state.centre}</Text>
          {"\n"}
          {"\n"}

          {this.state.pos}
          {"\n"}
          {"\n"}
        </Text>

        {/* 
                <Button
                    color="blue"
                    title="Proceed"
                    onPress={this.buttonClickListener}
                    onPress={() => this.props.navigation.navigate("Notification")}

                /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseText: {},
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default HomeAccepted;
