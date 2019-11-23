import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    KeyboardAvoidingView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Images } from '@assets';

import { w, h, totalSize } from '../../helpers/Dimension';

const Splash = ({ navigation }) => {
    useEffect(() => {
        console.log('inside th Organization list')
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

                    <Text style={styles.textSlogan}>Loading...</Text>
                    


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
        padding: 10
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

export default Splash;
