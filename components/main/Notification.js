import React, { Component } from 'react';
import { View, Text, Title, Button, TouchableOpacity, StyleSheet } from 'react-native';
import CountDown from 'react-native-countdown-component';
import HomeFunc from './Home';


export class Notification extends Component {

    onAccept() {
        this.props.navigation.navigate("HomeAccepted")

    }

    onReject() {
        this.props.navigation.navigate("Home")
    }


    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 16 }
            }>
                <View style={{
                    flex: 1, justifyContent: 'center', marginLeft: 35, marginRight: 35, backgroundColor: '#DCDCDC', borderRadius: 25
                }}>
                    <Text style={{ fontWeight: 'bold', margin: 10, textAlign: 'center' }}>
                        Hello, you have been invited to receive your vaccine
                    </Text>
                    <Text style={{ fontWeight: 'bold', margin: 10, textAlign: 'center' }}>
                        This invite is only valid for the remaining time below.
                    </Text>

                </View>

                <CountDown
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

                </View>


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

export default Notification
