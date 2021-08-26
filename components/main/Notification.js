import React, { Component } from 'react';
import { View, Text, Title, Button, TouchableOpacity } from 'react-native';
import CountDown from 'react-native-countdown-component';


export class Notification extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 16 }
            }>
                <View style={{ flex: 1, justifyContent: 'center', marginLeft: 40, marginRight: 35 }}>
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

                    digitStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625' }}
                    digitTxtStyle={{ color: '#1CC625' }}
                    timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                    separatorStyle={{ color: '#1CC625' }}
                    timeToShow={['H', 'M', 'S']}
                    timeLabels={{ m: null, s: null }}
                    showSeparator
                />

                <View style={{
                    height: 15
                }}>

                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 50 }}>

                    <Button
                        title="Accept"
                        color="green"


                    />
                    <Button
                        title="Reject"
                        color="red"

                    />

                </View>

                <View style={{ flex: 1 }}>

                </View>

            </View >
        )
    }
}

export default Notification
