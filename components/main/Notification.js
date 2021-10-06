import React, { Component, useState, useEffect } from 'react';
import { View, Text, Title, Button, TouchableOpacity, StyleSheet } from 'react-native';
import CountDown from 'react-native-countdown-component';
import HomeFunc from './Home';
import firebase from 'firebase';
import { connect } from 'react-redux';


function Notification(props) {

    const { currentUser } = props;


    const [notificationsList, setOffers] = useState([]);
    const [loading, setLoading] = useState(false);

    function getOffers() {
        setLoading(true)
        firebase.firestore().collection("offers").onSnapshot((querySnapshot) => {
            const offers = [];
            querySnapshot.forEach((doc) => {
                if (doc.data().user == firebase.auth().currentUser.email) {
                    offers.push(doc.id);
                }

            });
            setOffers(offers);
            setLoading(false);
        })
    }

    useEffect(() => {
        getOffers();
    }, [])

    if (loading) {
        return (
            <View>
                <Text>Loading ...</Text>
            </View>)
    }
    else {

        return (
            <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 16 }
            }>
                <View style={{
                    flex: 1, justifyContent: 'center', marginLeft: 35, marginRight: 35, backgroundColor: '#DCDCDC', borderRadius: 25
                }}>
                    <Text style={{ fontWeight: 'bold', margin: 10, textAlign: 'center' }}>
                        Hello, you have been invited to receive your vaccine
                    </Text>
                    {/* <Text style={{ fontWeight: 'bold', margin: 10, textAlign: 'center' }}>
                        This invite is only valid for the remaining time below.

                    </Text> */}

                    {notificationsList.map((name) => (
                        <View styles={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', margin: 10, textAlign: 'center' }}>VaccineReference: {name}</Text>
                            {/* <Text>VaccineReference: {name}</Text> */}
                        </View>
                    ))}


                </View>

                {/* <CountDown
                    size={30}
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

                <View style={{
                    height: 15
                }}>

                </View> */}


                <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 50 }}>

                    <Button
                        title="Accept"
                        color="green"
                        style={{ borderRadius: 25 }}
                        onPress={() => this.onAccept()}



                    />
                    <Button
                        title="Reject"
                        color="red"
                        style={{ borderRadius: 25 }}
                        onPress={() => this.onReject()}

                    />
                    {/* <TouchableOpacity
                        style={styles.acceptRejectButton}

                        activeOpacity={.5}
                        onPress={this.ButtonClickCheckFunction}
                    >

                        <Text > SUBMIT </Text>

                    </TouchableOpacity> */}

                </View>

                <View style={{ flex: 1 }}>

                </View>

            </View >
        )

    }
}
// const styles = StyleSheet.create({

//     acceptRejectButton: {

//         marginTop: 10,
//         paddingTop: 15,
//         paddingBottom: 15,
//         marginLeft: 30,
//         marginRight: 30,
//         backgroundColor: 'red',
//         borderRadius: 10,
//         borderWidth: 1,
//         borderColor: '#fff'
//     },
// })

const mapStateToProps = (store) => ({

    currentUser: store.userState.currentUser

})

export default connect(mapStateToProps, null)(Notification);

