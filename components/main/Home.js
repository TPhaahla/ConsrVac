import React, { Component } from "react";
import { View, TextInput, StyleSheet, Button, Text } from "react-native";
import { connect } from 'react-redux';
import firebase from 'firebase'
require('firebase/firestore')
import CountDown from 'react-native-countdown-component';

function Home(props) {

  const { currentUser } = props;

  if (currentUser == undefined) {
    return (<View>
      <Text>User Not Defined</Text>
    </View>)
  }
  else {
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

            digitStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: '##191970' }}
            digitTxtStyle={{ color: '#191970' }}
            timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
            separatorStyle={{ color: '#191970' }}
            timeToShow={['H', 'M', 'S']}
            timeLabels={{ m: null, s: null }}
            showSeparator
            STYLE={{ marginTop: 20 }}

            onFinish={() => this.onReject()}
          />

          <Text style={{ paddingTop: 15 }}>Status: </Text>
          <Text>Waitlist Position:  </Text>
          <Text>Vaccine Center: </Text>
        </View>

      </View>
    )
  }

}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
})


export default connect(mapStateToProps, null)(Home);
