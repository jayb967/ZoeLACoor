import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { ListItem } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';
import { Images } from '@assets';


const SpeakerItem = props => {

    const { speaker, changeColor } = props

    return (

        <ListItem
            Component={TouchableScale}
            friction={90} //
            tension={100} // These props are passed to the parent component (here TouchableScale)
            activeScale={0.95} //
            containerStyle={styles.button}
            onPressIn={() => changeColor(speaker)}
            linearGradientProps={{
                colors: [speaker, 'black'],
                start: [1, 0],
                end: [0.2, 0],
                style: {borderRadius: 12}
            }}
            ViewComponent={LinearGradient} // Only if no expo
            style={styles.button}
            leftAvatar={{ rounded: true, source: Images[speaker]  }}
            title={speaker == 'red' ? 'STOP' : speaker == 'yellow' ? 'STANDBY' : 'SEND NOW'}
            titleStyle={{ color: 'white', fontWeight: 'bold' }}
            subtitleStyle={{ color: 'white' }}
            // subtitle="Some other shit"
            chevron={{ color: 'white' }}
        />)

    // <TouchableOpacity
    //     onPress={() => console.log('the speaker was pressed')}
    //     style={styles.button}
    // >
    //     {/* <Image
    //     source={require("../../../../assets/images/avatar1.jpg")}
    //     resizeMode="cover"
    //     style={styles.image}
    // /> */}
    //     <View
    //         style={{
    //             flex: 1,
    //             flexDirection: "row",
    //         }}
    //     >
    //         <Text style={styles.text8}>Natalie </Text>
    //     </View>
    //     <Text style={styles.text7}>1:02PM</Text>
    // </TouchableOpacity>)
}

const styles = StyleSheet.create({
    speakerList: {
        width: 358,
        position: "relative",
        paddingTop: 50,
        alignSelf: 'center'
    },
    button: {
        height: 70,
        // width: '100%',
        // alignSelf: "center",
        borderRadius: 12,
        // flexDirection: "row",
        marginBottom: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.3,
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
})

export default SpeakerItem