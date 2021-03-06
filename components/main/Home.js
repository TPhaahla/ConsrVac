
/* This class is used to create the Home page on the app
along with the components and their functionality on the page. 
It will render the components on the UI and its specified styling
format. The Home page "Welcomes" the user with their name at the top
for a personalised touch. As well as provides the user with their
current vaccine status/whether or not an offer is available. */

import React, { Component, useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Button, Text, Image } from "react-native";
import { connect } from 'react-redux';
import firebase from 'firebase'
require('firebase/firestore')
import CountDown from 'react-native-countdown-component';

function Home(props) {

  const { currentUser } = props;

  const [offerRef, setOffer] = useState([]);
  //const [loading, setLoading] = useState(false);
  const [awaiting, setStat] = useState(false);

  /* if offer is available, the page will instruct the user to 
  go to the notification page */
  function showOffer(currentUser) {
    //setLoading(true);
    firebase.firestore().collection("offers").onSnapshot((querySnapshot) => {
      const offerReady = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().user == firebase.auth().currentUser.email) {
          offerReady.push(doc.id);
        }

      });
      setOffer(offerReady);
      // setLoading(false);
    })

  }

  useEffect(() => {
    showOffer();
  }, [])

  if (currentUser == undefined) {
    return (<View>
      <Text>User Not Defined</Text>
    </View>)
  }


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


      <Image
        style={styles.image}
        source={require("../../assets/ConsrVac_cropped.png")}
      />



      <Text style={{ padding: 30, marginTop: -50, marginBottom: 20, justifyContent: 'space-around', fontWeight: 'bold', fontSize: 20 }}>
        Welcome {currentUser.displayName} ,
      </Text>

      <View style={{
        flex: 1, justifyContent: 'center', backgroundColor: '#DCDCDC', borderRadius: 25, padding: 45
      }}>

        <Text style={{ padding: 10, justifyContent: 'center', textAlign: "center" }}>All available offers will be displayed here but can only be accepted or rejected in the **Notification Tab** {"\n"} Please check it regularly and respond within the allocated time.</Text>



        <Text style={{ fontWeight: 'bold', margin: 10, textAlign: 'center' }}>Vaccine Offer Details: </Text>

        {offerRef.map((name) => (
          <View styles={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', margin: 10, textAlign: 'center' }}>Ref: {name}</Text>
            <Text style={{ fontWeight: 'bold', margin: 10, textAlign: 'center' }}>Offer Status: {currentUser.status}</Text>
            <Text style={{ fontWeight: 'bold', margin: 10, textAlign: 'center' }}>Vaccine Center: Newlands </Text>


          </View>
        ))}

      </View>

    </View>
  )






}


/* format for styling the components on the home page */
const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: 250,
    height: 250,
    resizeMode: "contain",

  },
})

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
})


export default connect(mapStateToProps, null)(Home);
