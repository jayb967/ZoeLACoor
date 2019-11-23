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
import { Input, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Images } from '@assets';
import { Firebase } from '@api';
import { SelectImageButton } from '@components'
import ImagePicker from 'react-native-image-crop-picker';

import { w, h, totalSize } from '../../helpers/Dimension';

const Register = ({ registerRoute, onSignIn }) => {

    const initialUser = { name: '', email: '', role: '', setOrganization: false }

    const input = React.createRef();
    const inputEmail = React.createRef();
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [imageObject, setImageObject] = useState(null)
    const [user, setUser] = useState(initialUser)
    // const [isCode, setIsCode] = useState(false)
    const [confirmToken, setConfirmToken] = useState(null)


    const handleClick = async () => {
        setLoading(true)
        if (user.name && isEmailValid() && user.role) {


            await Firebase.shared.updateUser(user, imageObject)
                .then(result => {
                    console.log('this is the result', result)
                    setLoading(false)
                    onSignIn(result)
                    return

                }).catch(err => {
                    alert(`There was an error creating user: ${err}`)
                    setLoading(false)
                    return
                })
            return

        }
        alert('Some fields are missing/incorrect!')
        setLoading(false)

    }

    const isEmailValid = () => {
        if (!user.email || !user.email.includes('@') || !user.email.includes('.com')) {
            return false
        }
        return true
    }

    const handleInput = (field, value) => {
        // if (value) {
        user[field] = value
        setUser({ ...user })
        // }
    }

    const handlePhoneNumber = (value) => {
        const re = /^[0-9]+$/;
        if ((value === '' || re.test(value)) && value.length < 11) {
            // setPhoneNumber(value)
        }
    }

    const handleImagePick = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 300,
            cropping: true,
            includeBase64: true
        }).then(image => {
            setImage(image.path)
            setImageObject(image)
        }).catch((err) => alert('Error picking image, please try again!'))
    }


    useEffect(() => {
        // console.log('inside the Login')
        input.current.focus()
    }, [])

    return (
        <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={-w(40)}
            style={styles.keyboard}
        >
            <LinearGradient colors={['white', 'gray']} style={styles.gradientBG}>
                <View style={styles.container}>
                    <Image style={styles.icon} resizeMode="contain" source={Images.logoBlack} />
                    <Text style={styles.textSlogan}>Register New User</Text>
                    <SelectImageButton onTap={() => handleImagePick()} image={image} color={'white'} />
                    <Input
                        placeholder='Full Name'
                        placeholderTextColor='grey'
                        leftIcon={
                            <Icon
                                name='user'
                                size={14}
                                color='grey'
                            />
                        }
                        errorMessage={!user.name && 'Name Required!'}
                        containerStyle={styles.inputContainer}
                        leftIconContainerStyle={styles.inputIcon}
                        labelStyle={styles.inputLabel}
                        inputStyle={styles.input}
                        ref={input}
                        value={user.name}
                        onChangeText={(text) => handleInput('name', text)}
                    />
                    <Input
                        placeholder='Email'
                        placeholderTextColor='grey'
                        leftIcon={
                            <Icon
                                name='envelope'
                                size={14}
                                color='grey'
                            />
                        }
                        errorMessage={!isEmailValid() && 'Email Required!'}
                        containerStyle={styles.inputContainer}
                        leftIconContainerStyle={styles.inputIcon}
                        labelStyle={styles.inputLabel}
                        inputStyle={styles.input}
                        ref={inputEmail}
                        value={name.email}
                        onChangeText={(text) => handleInput('email', text)}
                    />
                    <CheckBox
                        center
                        title='Speaker'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        uncheckedColor={!user.role ? 'red' : 'grey'}
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, padding: 0 }}
                        checked={user.role.includes('speaker')}
                        onPress={() => handleInput('role', 'speaker')}
                    />
                    <CheckBox
                        center
                        title='Coordinator'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        uncheckedColor={!user.role ? 'red' : 'grey'}
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                        checked={user.role.includes('coordinator')}
                        onPress={() => handleInput('role', 'coordinator')}
                    />
                    {loading ? <ActivityIndicator size="large" style={styles.spinner} color='white' />
                        : <TouchableOpacity
                            style={styles.loginButton}

                            onPress={handleClick}
                        >
                            <Text style={styles.loginText}>Save</Text>
                        </TouchableOpacity>}


                    <TouchableOpacity style={styles.registerButton} onPress={() => registerRoute && registerRoute(false)}>
                        <Text style={styles.registerText}>Back</Text>
                    </TouchableOpacity>


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
        height: h(5),
        marginTop: h(18),

    },
    inputContainer: {
        width: w(50),
        height: h(6),
        marginBottom: 15
    },
    inputIcon: {
        marginRight: 5
    },
    inputLabel: {
        color: 'grey'
    },
    input: {
        color: 'grey'
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
        color: 'grey',
        fontSize: 18,
        fontWeight: '700'
    },
    textSlogan: {
        marginTop: h(2),
        marginBottom: h(1),
        color: 'grey',
        fontSize: 14,
        fontWeight: '300'
    }
})

export default Register;
