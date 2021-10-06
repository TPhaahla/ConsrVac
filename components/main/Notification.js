import React, { Component, useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import CountDown from "react-native-countdown-component";
import HomeFunc from "./Home";
import firebase from "firebase";
import { connect } from "react-redux";

//"change"
function Notification(props) {
  const [notificationsList, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = props;

  //fetches offers from firebase
  function getOffers(currentUser) {
    setLoading(true);
    firebase
      .firestore()
      .collection("offers")
      .onSnapshot((querySnapshot) => {
        const offers = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().user == firebase.auth().currentUser.email) {
            offers.push(doc.id);
          }
        });
        setOffers(offers);
        setLoading(false);
      });
  }

  //when user accepts offer, changes status to accepted
  function onAccept() {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        status: "accepted",
      });
    currentUser.status = "accepted";
  }

  //when user rejects offer, changes status to rejected
  function onReject() {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        status: "awaiting",
      });

    currentUser.status = "awaiting";

    firebase
      .firestore()
      .collection("offers")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().user == currentUser.email) {
            firebase.firestore().collection("offers").doc(doc.id).delete();
            return;
          }
        });
      });
  }

  useEffect(() => {
    getOffers();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 16 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            marginLeft: 35,
            marginRight: 35,
            backgroundColor: "#DCDCDC",
            borderRadius: 25,
          }}
        >
          <Text style={{ fontWeight: "bold", margin: 10, textAlign: "center" }}>
            Hello, you have been invited to receive your vaccine
          </Text>

          {notificationsList.map((name) => (
            <View styles={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{ fontWeight: "bold", margin: 10, textAlign: "center" }}
              >
                VaccineReference: {name}
              </Text>
            </View>
          ))}
        </View>

        <CountDown
          size={30}
          until={1000}
          digitStyle={{
            backgroundColor: "#FFF",
            borderWidth: 2,
            borderColor: "##191970",
          }}
          digitTxtStyle={{ color: "#191970" }}
          timeLabelStyle={{ color: "red", fontWeight: "bold" }}
          separatorStyle={{ color: "#191970" }}
          timeToShow={["H", "M", "S"]}
          timeLabels={{ m: null, s: null }}
          showSeparator
          STYLE={{ marginTop: 20 }}
          onFinish={() => this.onReject()}
        />

        <View
          style={{
            height: 15,
          }}
        ></View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            height: 50,
          }}
        >
          <Button
            title="Accept"
            color="green"
            style={{ borderRadius: 25 }}
            onPress={() => onAccept()}
          />
          <Button
            title="Reject"
            color="red"
            style={{ borderRadius: 25 }}
            onPress={() => onReject()}
          />
        </View>

        <View style={{ flex: 1 }}></View>
      </View>
    );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(Notification);
