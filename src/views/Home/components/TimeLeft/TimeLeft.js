import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native'
import Svg, { Ellipse, Defs, LinearGradient, Stop } from "react-native-svg";

import { Center } from "@builderx/utils";



const TimeLeft = props => {
    return (
        <View style={styles.userInfo}>
            <View
                style={[
                    styles.stack,
                    {
                        marginLeft: 0,
                        height: 310,
                        width: 311
                    }
                ]}
            >

                <TouchableOpacity style={styles.button2}>
                    <View
                        style={[
                            styles.stack,
                            {
                                marginTop: 0,
                                height: 300
                            }
                        ]}
                    >
                        <Svg viewBox="0 0 300.00 299.99" style={styles.ellipse2}>
                            <Ellipse
                                strokeWidth={5}
                                fill="rgba(201,199,199,1)"
                                fillOpacity={0.9}
                                stroke="white"
                                cx={150}
                                cy={150}
                                rx={148}
                                ry={147}
                            />
                        </Svg>
                        <Center horizontal>
                            <Text style={styles.onStageText}>On Stage</Text>
                        </Center>
                        <Text style={styles.timeLeft}>T - 25 Secs</Text>
                    </View>
                </TouchableOpacity>
                <Image
                    source={require('../../../../assets/images/avatar.png')}
                    resizeMode="cover"
                    style={styles.avatar}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 360,
        height: 660,
        //   backgroundColor: "rgba(188,188,188,1)",
        opacity: 1
    },
    Service: {
        width: 292,
        height: 72,
        marginTop: 10,
        marginLeft: 34
    },
    ServiceTime: {
        color: "rgba(255,255,255,1)",
        fontSize: 24,
        //   fontFamily: "times-new-roman-regular",
        textAlign: "center",
        alignSelf: "center",
        marginTop: 13
    },
    stack: {
        position: "relative"
    },
    ellipse: {
        top: 86,
        left: 0,
        width: 859,
        height: 757,
        position: "absolute"
    },
    SpeakerList: {
        width: 358,
        height: 249,
        position: "absolute",
        bottom: 273,
        left: 51,
        justifyContent: "center",
        alignItems: "center"
    },
    sub: {
        width: 300,
        height: 249
    },
    button: {
        height: 80,
        alignSelf: "center",
        borderColor: "rgba(146,144,144,1)",
        borderWidth: 1,
        flexDirection: "row",
        marginBottom: 130
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100,
        alignSelf: "center",
        marginLeft: 5
    },
    text8: {
        color: "rgba(74,74,74,1)",
        fontSize: 20,
        marginTop: 31,
        marginLeft: 82
    },
    text7: {
        color: "rgba(74,74,74,1)",
        fontSize: 18,
        textAlign: "right"
    },
    userInfo: {
        top: 20,
        left: 50,
        position: "relative",
        right: 449
    },
    button2: {
        top: 11,
        left: 11,
        width: 300,
        height: 300,
        position: "absolute"
    },
    ellipse2: {
        top: 0,
        left: 0,
        width: 300,
        height: 300,
        position: "absolute"
    },
    onStageText: {
        color: "rgba(74,74,74,1)",
        position: "absolute",
        bottom: 182,
        fontSize: 20,
        //   fontFamily: "roboto-regular",
        textAlign: "center"
    },
    timeLeft: {
        left: 0,
        color: "black",//rgba(221,56,56,100)
        position: "absolute",
        right: 0,
        fontSize: 40,
        fontWeight: '700',
        //   fontFamily: "roboto-regular",
        textAlign: "center",
        top: 125
    },
    avatar: {
        top: 0,
        left: 0,
        width: 120,
        height: 120,
        position: "absolute",
        borderRadius: 100
    }
});

export default TimeLeft;