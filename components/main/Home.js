import React, { Component, useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Button, Text } from "react-native";
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



  if (currentUser.status == "pending") {
    setStat(true);
  }


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Text style={{ padding: 30, marginTop: -50, marginBottom: 20, justifyContent: 'space-around', fontWeight: 'bold', fontSize: 20 }}>
        Welcome {currentUser.displayName} ,
      </Text>

      <View style={{
        flex: 1 / 3, justifyContent: 'center', backgroundColor: '#DCDCDC', borderRadius: 25, padding: 45
      }}>

        <Text style={{ padding: 10, justifyContent: 'center' }}>Time Left to Accept {"\n"} or Reject Vaccine offer</Text>

        <CountDown
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
        />
        {/* <Text>Placehold</Text> */}

        {offerRef.map((name) => (
          <View styles={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', margin: 10, textAlign: 'center' }}>Ref: {name}</Text>

          </View>
        ))}
        <Text>Waitlist Position:  </Text>
        <Text>Vaccine Center: </Text>
      </View>

    </View>
  )


}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
})


export default connect(mapStateToProps, null)(Home);
