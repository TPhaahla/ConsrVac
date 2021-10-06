import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { color, set } from 'react-native-reanimated';
import firebase from 'firebase';
import { Button } from 'react-native-elements/dist/buttons/Button';


export default function WaitlingList() {

    // initialise state variables to allow for code to re-render on state update
    const [waitingList, setUsers] = useState([]);
    const [pendingList, setPending] = useState([]);
    const [acceptedList, setStatus] = useState([]);


    const [loading, setLoading] = useState(false);

    //get all users from database and store in relevant state as an array
    //this method is asynchronous and will firewhenever there is a change in the database documents used in this class.
    function getUsers() {
        setLoading(true)
        firebase.firestore().collection("users").onSnapshot((querySnapshot) => {
            const names = [];
            const pending = [];
            const accepted = [];

            //loop through all docs in database to assign user to correct group on front end view
            querySnapshot.forEach((doc) => {

                if (doc.data().status == "pending") {
                    pending.push(doc.data())
                }
                else if (doc.data().status == "accepted") {
                    accepted.push(doc.data())
                }
                else {
                    names.push(doc.data())
                }

            });
            setUsers(names);
            setPending(pending);
            setStatus(accepted);

            setLoading(false);
        })
    }


    //send and store notification status to allow user to view it in their mobile app.
    function sendNotification(email) {

        firebase.firestore().collection("offers").add({
            title: "Vaccine Offer",
            user: email.toLowerCase()
        })



        firebase.firestore().collection("users").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                if (doc.data().email == email) {

                    firebase.firestore().collection("users").doc(doc.id).update({
                        status: "pending",
                    })

                }

            })
        })



    }

    //allows for realtime updates of state variable.
    useEffect(() => {
        getUsers();
    }, [])


    //allow for database content to load into the application first before rendering components.
    if (loading) {
        return (
            <View>
                <Text>Loading ...</Text>
            </View>)
    }
    else {
        return (


            <View style={styles.container}>

                <View style={styles.header}>

                    <Image
                        style={styles.image}
                        source={require("../../assets/ConsrVac_cropped.png")}
                    />

                </View>
                {/* Main container with 3 sections showing each user under their offerstatus on the iPad app. */}
                <View style={styles.boxMain}>
                    <View style={styles.box}>
                        <ScrollView contentContainerStyle={styles.innerScroll}>

                            <Text style={{ padding: 30, marginTop: 10, marginBottom: 20, justifyContent: 'space-around', fontWeight: 'bold', fontSize: 20 }}>Pending Offers</Text>
                            {pendingList.map((name) => (
                                <View style={styles.borderView}>
                                    <Text style={styles.list} >{name.displayName} {name.surname} </Text>

                                </View>
                            ))}

                        </ScrollView>
                    </View>
                    <View style={styles.box}>
                        <ScrollView contentContainerStyle={styles.innerScroll}>

                            <Text style={{ padding: 30, marginTop: 10, marginBottom: -20, justifyContent: 'space-around', fontWeight: 'bold', fontSize: 20 }}>Registered Users</Text>
                            {waitingList.map((name) => (
                                <View style={styles.borderView}>
                                    <Text style={styles.list} >{name.displayName} {name.surname} </Text>
                                    <TouchableOpacity style={styles.loginBtn}>
                                        <Text>Send Notification</Text>
                                    </TouchableOpacity>


                                </View>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={styles.box}>
                        <ScrollView contentContainerstyle={styles.innerScroll}>

                            <Text style={{ padding: 30, marginTop: 10, marginBottom: 20, justifyContent: 'space-around', fontWeight: 'bold', fontSize: 20 }}>Accepted Offers</Text>
                            {acceptedList.map((name) => (
                                <View style={styles.borderView}>
                                    <Text style={styles.list} >{name.displayName} {name.surname} </Text>


                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>



            </View>
        )
    }

}

//Stylesheet document
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    header: {
        width: '100%',
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#eee'

    },
    boxMain: {
        width: '100%',
        height: '85%',
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap'


    },
    box: {
        width: '33.3%',
        height: '90%',
        padding: 5

    },
    inner: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center'

    },
    image: {
        flex: 1,
        width: 250,
        height: 250,
        resizeMode: "contain",
    },

    innerScroll: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginBtn: {
        //width: "100%",
        borderRadius: 10,
        padding: 5,
        //height: 50,
        alignItems: "center",
        justifyContent: "center",
        //marginTop: 40,
        //marginBottom: 20,
        backgroundColor: "#427bd2",
    },
    borderView: {
        backgroundColor: '#A9A9A9',
        borderRadius: 5,
        borderColor: 'black',
        padding: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '80%'

    },
    list: {
        width: 200,
        padding: 10,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        //borderWidth: 2,
    }
})