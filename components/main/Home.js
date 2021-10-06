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


        {/* <CountDown
            size={20}
            until={1000}

            digitStyle={{ backgroundColor: '#FFF', borderWidth: 1.5, borderColor: '##191970' }}
            digitTxtStyle={{ color: '#191970' }}
            timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
            separatorStyle={{ color: '#191970' }}
            timeToShow={['H', 'M', 'S']}
            timeLabels={{ m: null, s: null }}
            showSeparator
            STYLE={{ marginTop: 20 }}

          // onFinish={() => this.onReject()}
          /> */}
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
