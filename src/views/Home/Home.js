import React, { useState } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import Svg, { Ellipse } from "react-native-svg";

import { TimeLeft, Header, SpeakerList, TimeRange } from './components'


const Home = ({ navigation }) => {

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>

                <View style={styles.body}>
                    <Svg viewBox="50 -80 400 400" style={styles.ellipse}>
                        <Ellipse
                            strokeWidth={1}
                            fill="white"
                            cx={430}
                            cy={378}
                            rx={429}
                            ry={378}
                        />
                    </Svg>
                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}>
                        <Header navigation={navigation} />
                        <View 
                        // style={styles.body}
                        >
                            <TimeRange />
                            <TimeLeft />
                            <SpeakerList />
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    )

}
const styles = StyleSheet.create({
    ellipse: {
        top: 86,
        left: 0,
        width: 859,
        height: 757,
        position: "absolute"
    },
    body: {
        backgroundColor: 'black'
        // rgba(201,199,199,1)
    }

});

export default Home;