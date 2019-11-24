import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    // View,
    Text,
    Image,
    Platform,
} from 'react-native';
import { Images } from '@assets';
import { Firebase } from '@api'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
import { useIsFocused } from '@react-navigation/core';
import { useGlobal } from '@store'
import { View } from 'react-native-animatable';


import { w, h, totalSize } from '../../helpers/Dimension';

const SpeakerQueue = ({ navigation, registerRoute, onSignIn }) => {
    const [globalState, globalActions] = useGlobal();
    const isFocused = useIsFocused();
    const animatedView = useRef(null);


    const [userLive, setUserLive] = useState('')
    const [image, setImageLive] = useState('')
    const [color, setColor] = useState('red')

    const { user, orgID } = globalState

    async function getOrganizationID() {
        const id = await Firebase.shared.retrieveOrganization()
        if (id) {
            globalActions.user.setOrganizationID(id)
        }
    }
    // console.log('this is the orgID', orgID)
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
                // orgData && setIsListenerInitializing(false)
                return () => ref()
            });
    }, [orgID, isFocused])

    useEffect(() => {
        if (!isFocused && orgID) return;
        async function chooseOrgs() {
            // speakers.length === 0 && getSpeakers()
           
            isFocused && Firebase.shared.checkCurrentUser()
                .then(user => {
                    if (!user) {
                        console.log('there was no userr', user)
                        return
                    }
                    globalActions.user.setUser(user)
                    if (user.setOrganization) {
                        globalActions.user.setOrganization(true)
                    }
                })
                .catch(err => alert(`An error occurred ${err}`));

            if (isFocused && !orgID && user) {
                console.log('existing user', user)
                getOrganizationID && getOrganizationID()
            } else if (isFocused && !orgID && !user) {
                console.log('no existing userm sign in anonymous', user)
                await Firebase.shared.signInAnonymously()
                   navigation.push('Organization1')
            }
        }


        chooseOrgs()
    }, [isFocused])

    const ipadText = {
        fontSize: 70,
        marginTop: "1%",
    };
    const ipadText2 = {
        fontSize: 40,
    };
    const ipadImage = {
        marginLeft: -w(65),
        marginTop: -h(17.5),
        height: h(20),
    };

    const message = {
        black: 'STOP',
        red: 'STOP',
        yellow: 'STAND BY',
        green: 'SEND NOW'

    }

    const message2 = {
        black: 'Service in Process',
        red: 'Service in Process',
        yellow: 'Be Ready for Cue',
        green: 'Cue to Stage'
    }

    const speed = {
        black: 10000,
        red: 10000,
        yellow: 1000,
        green: 0
    }

    return (
        <LinearGradient colors={['black', color]} style={styles.gradientBG}>

            <View animation="fadeIn" style={styles.container}>
            <Text style={styles.message}>NEXT ON STAGE</Text>
                <Text style={styles.textSlogan}>{userLive}</Text>

                {/* <Text style={styles.message}>SIDE STAGE</Text> */}

                <View
                    animation="pulse"
                    iterationDelay={1500}
                    ref={animatedView}
                    // duration={200}
                    // easing="ease-out" 
                    iterationCount="infinite"
                    style={{
                        alignItems: 'center',
                        textAlign: 'center',
                        backgroundColor: 'white',
                        marginTop: h(5),
                        marginLeft: w(10),
                        height: h(15),
                        width: w(80),
                        borderWidth: 5,
                        borderRadius: 20,
                        borderColor: color
                    }}>
                    <Text style={Platform.isPad ? [styles.text, ipadText] : styles.text}>{message[color]}</Text>
                    <Text style={Platform.isPad ? [styles.text2, ipadText2] : styles.text2}>{message2[color]}</Text>
                </View>
                <Image style={Platform.isPad ? [styles.icon, ipadImage] : styles.icon} resizeMode="contain" source={Images[color]} />

            </View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: 'white'
    },
    container2: {
        display: 'flex',
    },
    middleContainer: {
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'white',
        marginTop: h(40),
        height: h(15),
        width: w(80),
        borderWidth: 2,
        borderRadius: 20
    },
    icon: {
        marginLeft: -w(80),//-w(65),
        marginTop: -h(16.5),//-h(17.5),
        height: h(18)//h(20),

    },
    inputContainer: {
        width: w(50),
        height: h(20),
    },
    inputIcon: {
        marginRight: 5
    },
    inputLabel: {
        color: 'white'
    },
    input: {
        color: 'white'
    },
    gradientBG: {
        width: '100%',
        height: '100%'
    },
    keyboard: {
        width: '100%',
        height: '100%',
    },
    loginButton: {
        backgroundColor: 'white',
        borderRadius: 18,
        width: w(50),
        height: 45,
        textAlign: 'center',
        padding: 10,
        marginBottom: 20

    },
    loginText: {
        alignSelf: 'center',
        fontWeight: '400',
        fontSize: 17
    },
    registerText: {
        alignSelf: 'center',
        fontWeight: '300',
        fontSize: 15
    },
    registerButton: {
        margin: 20,
        width: w(30),
        height: 45,
        textAlign: 'center',
        padding: 10
    },
    message: {
        marginTop: h(10),
        color: 'white',
        fontSize: 20,
        fontWeight: '300'
    },
    text: {
        marginTop: "6%",//"1%",
        color: 'black',
        fontSize: 40,//70,
        fontWeight: '800'
    },
    text2: {
        marginTop: 0,
        color: 'gray',
        fontSize: 20,//40,
        fontWeight: '300'
    },
    textSlogan: {
        marginTop: h(25),
        color: 'white',
        fontSize: 60,
        fontWeight: '600'
    }
})

export default SpeakerQueue;
