import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/core';
import LinearGradient from 'react-native-linear-gradient';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import Svg, { Ellipse } from "react-native-svg";
import { Firebase } from '@api'

import { TimeLeft, Header, SpeakerList, TimeRange } from './components'
import { useGlobal } from '@store'



const Home = ({ navigation, signedInuser }) => {
    const [globalState, globalActions] = useGlobal();
    const [isListenerInitializing, setIsListenerInitializing] = useState(true)
    const [speakers, setSpeakers] = useState([])
    const [color, setColor] = useState('black')
    const [userLive, setUserLive] = useState('')
    const [imageLive, setImageLive] = useState('')

    const { user, orgID } = globalState
    const isFocused = useIsFocused();

    async function getOrganizationID() {
        const id = await Firebase.shared.retrieveOrganization()
        if (id) {
            globalActions.user.setOrganizationID(id)
        }
    }

    useEffect(() => {
        // speakers.length === 0 && getSpeakers()
        if (!isFocused) return;
        isFocused && Firebase.shared.checkCurrentUser()
            .then(user => {
                if (!user) {
                    return
                }
                globalActions.user.setUser(user)
                if (user.setOrganization) {
                    globalActions.user.setOrganization(true)
                }
                // setRole(user.role)
                // setUser(user)
            })
            .catch(err => alert(`An error occurred ${err}`));
        if (isFocused && !orgID) {
            getOrganizationID && getOrganizationID()
        }
    }, [isFocused])

    useEffect(() => {
        if (!isFocused || !orgID) return;
        const ref = Firebase.shared.orgCollection.doc(orgID)
        .onSnapshot(doc => {
            const orgData = doc.exists ? doc.data() : null
            if (orgData) {
                    setUserLive(orgData.name)
                    setImageLive(orgData.image)
                    setColor(orgData.color)
            }
            orgData && setIsListenerInitializing(false)
            return () => ref()
        });
    }, [isListenerInitializing, orgID, isFocused])

    // async function getSpeakers() {
    //     const orgs = await Firebase.shared.retrieveSpeakers()
    //     setSpeakers(orgs)
    // }

    // async function getColor() {
    //     const color = await Firebase.shared.retrieveColor()
    //     setColor(color)
    // }

    async function handleNameChange(nam) {
        orgID && await Firebase.shared.updateOrganization(orgID, {name: nam || '', color: 'black'})
        // setColor(color)
    }

    async function handleColorChange(col) {
        orgID && await Firebase.shared.updateOrganization(orgID, {color: col})
    }


    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <View style={styles.body}>
                    <LinearGradient colors={[color, 'black']}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}>
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
                            >
                                {user && user.setOrganization
                                    ? <React.Fragment>
                                        <TimeRange />
                                        <TimeLeft name={userLive || ''} image={imageLive ||''} changeName={(name) => handleNameChange(name)} />
                                        <SpeakerList speakers={speakers} changeColor={(color) => handleColorChange(color)}/>
                                    </React.Fragment>
                                    : <Text style={styles.notSet}>You do not belong to an organization!</Text>}

                            </View>
                        </ScrollView>
                    </LinearGradient>

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
        // backgroundColor: "linear-gradient(#000, #FFF);",

        height: '100%',
        width: '100%'
        // rgba(201,199,199,1)
    },
    notSet: {
        marginTop: 100,
        color: 'white',
        alignSelf: 'center'
    }

});

export default Home;