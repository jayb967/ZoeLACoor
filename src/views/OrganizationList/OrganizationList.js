import React, { useEffect } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image
} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

import Svg, { Ellipse } from "react-native-svg";

import { Header } from './components'


const OrganizationList = ({ navigation }) => {
   
    // useEffect(()=> {
    //     console.log('inside th Organization list')
    // })
    return (
        <>
            {/* <StatusBar barStyle="dark-content" /> */}
            {/* <SafeAreaView> */}
                <View>
                    <Svg viewBox="50 -80 400 400" style={styles.ellipse}>
                        <Ellipse
                            strokeWidth={1}
                            fill="gray"
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
                        <View style={styles.body}>
                            <Card
                                title='HELLO WORLD'
                                image={require('../../assets/images/avatar1.jpg')}
                                >
                                <Text style={{ marginBottom: 10 }}>
                                    The idea with React Native Elements is more about component structure than actual design.
                                </Text>
                                <Button
                                    icon={<Icon name='code' color='#ffffff' />}
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title='VIEW NOW' />
                            </Card>
                            <Text>Aloo</Text>
                            {/* <TimeRange/>
                            <TimeLeft />
                            <SpeakerList /> */}
                        </View>
                    </ScrollView>
                </View>
            {/* </SafeAreaView> */}
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
})
export default OrganizationList;