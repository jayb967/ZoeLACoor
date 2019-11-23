import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Overlay } from 'react-native-elements';
// https://github.com/kohver/react-native-touchable-scale

import { SpeakerItem } from './components'

const SpeakerList = props => {
    const [isVisible, setIsVisible] = useState(false)
    const { changeColor } = props
    const speakers = ['green', 'yellow', 'red']

    return (
        <View style={styles.speakerList}>
            <Overlay
                isVisible={isVisible}
                windowBackgroundColor="rgba(255, 255, 255, .5)"
                overlayBackgroundColor="white"
                height={200}
            // fullScreen
            >
                <View>
                    <TouchableOpacity
                        onPress={() => setIsVisible(false)}
                        style={styles.button3}
                    ><Text style={styles.buttonTextWhite}>Set Next</Text></TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setIsVisible(false)}
                        style={styles.button3}
                    ><Text style={styles.buttonTextWhite}>Add 10 Seconds</Text></TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setIsVisible(false)}
                        style={styles.button2}
                    ><Text style={styles.buttonText}>Cancel</Text></TouchableOpacity>

                </View>
            </Overlay>
            <View style={styles.sub}>
                {console.log('speakers in items', speakers)}
                {
                    speakers.length > 0 && speakers.map((item, i) => (
                        <SpeakerItem changeColor={changeColor} key={i} speaker={item} />
                    ))
                }


            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    speakerList: {
        width: 358,
        position: "relative",
        paddingTop: 50,
        alignSelf: 'center'
    },
    sub: {
        margin: 0
    },
    button: {
        height: 80,
        alignSelf: "center",
        borderRadius: 12,
        flexDirection: "row",
        marginBottom: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.6,
        shadowRadius: 6,
    },
    button2: {
        height: 40,
        minWidth: 200,
        padding: 10,

        // textAlign: 'center',
        alignSelf: "center",
        borderRadius: 12,
        marginBottom: 20,
        backgroundColor: 'rgba(230, 230, 230,1)',
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.6,
        shadowRadius: 6,
    },

    button3: {
        height: 40,
        minWidth: 200,
        padding: 10,

        // textAlign: 'center',
        alignSelf: "center",
        borderRadius: 12,
        marginBottom: 20,
        backgroundColor: 'rgba(101,33,108 ,100)',
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.6,
        shadowRadius: 6,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100,
        alignSelf: "center",
        marginLeft: 10,
        marginRight: 10
    },
    text7: {
        color: "rgba(74,74,74,1)",
        fontSize: 18,
        textAlign: "right",
        marginRight: 5,
        alignSelf: 'center'
    },
    text8: {
        color: "rgba(74,74,74,1)",
        fontSize: 20,
        alignSelf: 'center'
    },
    buttonText: {
        color: "rgba(74,74,74,1)",
        fontSize: 15,
        alignSelf: 'center'
    },
    buttonTextWhite: {
        color: "white",
        fontSize: 15,
        alignSelf: 'center'
    },

})

export default SpeakerList;