import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';


export default function WaitlingList() {
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text>Header Component</Text>
            </View>

            <View style={styles.boxMain}>
                <View style={styles.box}>
                    <View style={styles.inner}>

                        <Text>Box 1</Text>
                        <TextInput> What whhy</TextInput>
                    </View>
                </View>
                <View style={styles.box}>
                    <View style={styles.inner}>

                        <Text>Box 1</Text>
                    </View>
                </View>
                <View style={styles.box}>
                    <View style={styles.inner}>

                        <Text>Box 1</Text>
                    </View>
                </View>
            </View>



        </View>
    )


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

    }
})