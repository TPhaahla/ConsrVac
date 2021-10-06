import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { color, set } from 'react-native-reanimated';
import firebase from 'firebase';
import { Button } from 'react-native-elements/dist/buttons/Button';


export default function WaitlingList() {

    const [waitingList, setUsers] = useState([]);
    const [pendingList, setPending] = useState([]);
    const [acceptedList, setStatus] = useState([]);


    const [loading, setLoading] = useState(false);

    function getUsers() {
        setLoading(true)
        firebase.firestore().collection("users").onSnapshot((querySnapshot) => {
            const names = [];
            const pending = [];
            const accepted = [];
            //const references = [];
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


    function sendNotification(email) {

        firebase.firestore().collection("offers").add({
            title: "Vaccine Offer",
            user: email.toLowerCase()
        })


        // firebase.firestore().collection("users").onSnapshot((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //         if (doc.data().email == email) {
        //             firebase.auth().
        //         }
        //     })
        // })

    }


    useEffect(() => {
        getUsers();
    }, [])

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
                    <Text>Header Component</Text>
                </View>

                <View style={styles.boxMain}>
                    <View style={styles.box}>
                        <ScrollView contentContainerStyle={styles.innerScroll}>

                            <Text>Registered Users</Text>
                            {waitingList.map((name) => (
                                <View >
                                    <Text style={styles.list} >{name.displayName} {name.surname} </Text>
                                    <Button
                                        color="blue"
                                        title="SendNotification"
                                        onPress={() => sendNotification(name.email)}
                                    />
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={styles.box}>
                        <ScrollView contentContainerStyle={styles.innerScroll}>

                            <Text>Pending Offers</Text>
                            {pendingList.map((name) => (
                                <View >
                                    <Text style={styles.list} >{name.displayName} {name.surname} </Text>

                                </View>
                            ))}

                        </ScrollView>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.inner}>

                            <Text>Accepted Offers</Text>
                            {acceptedList.map((name) => (
                                <View >
                                    <Text style={styles.list} >{name.displayName} {name.surname} </Text>


                                </View>
                            ))}
                        </View>
                    </View>
                </View>



            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    header: {
        width: '100%',
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee'

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
        height: '80%',
        padding: 5

    },
    inner: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center'

    },

    innerScroll: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    list: {
        width: '100 %',
        padding: 5,
        flexWrap: 'wrap'
    }
})