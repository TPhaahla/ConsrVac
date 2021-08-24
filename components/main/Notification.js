import React, { Component } from 'react';
import { View, Text, Title, Button } from 'react-native';

export class Notification extends Component {
    render() {
        return (
            <View>
                <Button
                    title="Accept"
                    color="green"
                />
                <Button
                    title="Reject"
                    color="red"
                />

            </View>
        )
    }
}

export default Notification
