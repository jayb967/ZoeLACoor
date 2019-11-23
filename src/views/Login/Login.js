import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Images } from '@assets';
import { Firebase } from '@api';

import { w, h, totalSize } from '../../helpers/Dimension';

const Login = ({ registerRoute, onSignIn }) => {

    const input = React.createRef();
    const [phoneNumber, setPhoneNumber] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [isCode, setIsCode] = useState(false)
    const [confirmToken, setConfirmToken] = useState(null)


    const handleClick = () => {
        setLoading(true)

        if (isCode) {
            
            // Send code confirm here
            Firebase.shared.confirmCode(phoneNumber, confirmToken)
                .then(async user => {
                    const userExists = await Firebase.shared.checkForUserUID()
                    if (userExists) {
                        onSignIn(userExists)
                        setLoading(false)
                        return
                    }

                    alert('User not found! Register new user.')
                    setIsCode(false)
                    setMessage('')
                    setPhoneNumber('')
                    setLoading(false)
                    registerRoute(true)

                })
        } else
            if (phoneNumber.length == 10) {

                Firebase.shared.sendPhoneNumber(`+1${phoneNumber}`)
                    .then(confirmResult => {
                        alert('Code sent in text! (Standard text rates will apply)')
                        setLoading(false)
                        setIsCode(true)
                        setPhoneNumber('')
                        setMessage('Enter Code received in text')
                        setConfirmToken(confirmResult)
                    })
                    .catch((err) => {
                        alert('Error reaching server!')
                    })
            } else {
                setLoading(false)
                setMessage('Invalid Phone Number!')
            }

    }

    const handlePhoneNumber = (value) => {
        const re = /^[0-9]+$/;
        if ((value === '' || re.test(value)) && value.length < 11) {
            setPhoneNumber(value)
        }
    }


    useEffect(() => {
        // console.log('inside the Login')
        // input.current.focus()
    })

    return (
        <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={-w(40)}
            style={styles.keyboard}
        >

            <LinearGradient colors={['black', 'gray']} style={styles.gradientBG}>
                <View style={styles.container}>
                    <Image style={styles.icon} resizeMode="contain" source={Images.logo} />
                    <Text style={styles.textSlogan}>Stage Countdown</Text>

                    <Text style={styles.message}>{message}</Text>
                    <Input
                        placeholder={isCode ? 'Code' : 'Phone Number'}
                        placeholderTextColor='grey'
                        leftIcon={
                            <Icon
                                name={isCode ? 'hashtag' : 'phone'}
                                size={20}
                                color='white'
                            />
                        }
                        containerStyle={styles.inputContainer}
                        leftIconContainerStyle={styles.inputIcon}
                        labelStyle={styles.inputLabel}
                        inputStyle={styles.input}
                        ref={input}
                        value={phoneNumber}
                        onChangeText={(text) => isCode ? setPhoneNumber(text) : handlePhoneNumber(text)}
                    />
                    {loading ? <ActivityIndicator size="large" style={styles.spinner} color='white' />
                        : <TouchableOpacity
                            style={styles.loginButton}
                            disabled={isCode ? phoneNumber.length < 6 : false}
                            onPress={handleClick}
                        >
                            <Text style={styles.loginText}>{isCode ? 'Confirm Code' : 'Continue'}</Text>
                        </TouchableOpacity>}

                        <TouchableOpacity
                            style={styles.loginButton}
                            // disabled={isCode ? phoneNumber.length < 6 : false}
                            // onPress={handleClick}
                        >
                            <Text style={styles.loginText}>I am a Speaker</Text>
                        </TouchableOpacity>


                    {/* {!isCode && <TouchableOpacity style={styles.registerButton} onPress={() => registerRoute && registerRoute(true)}>
                        <Text style={styles.registerText}>Register New</Text>
                    </TouchableOpacity>} */}


                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    icon: {
        width: w(50),
        height: h(10),
        marginTop: h(18),

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
        // backgroundColor: 'white',
        // borderRadius: 18,
        margin: 20,
        width: w(30),
        height: 45,
        textAlign: 'center',
        padding: 10
    },
    message: {
        marginTop: h(2),
        color: 'white',
        fontSize: 15,
        fontWeight: '300'
    },
    text: {
        // margin: 20,
        color: 'white',
        fontSize: 18,
        fontWeight: '700'
    },
    textSlogan: {
        marginTop: h(2),
        marginBottom: h(10),
        color: 'white',
        fontSize: 18,
        fontWeight: '300'
    }
})

export default Login;
