import React, { useEffect, useState } from 'react';
import { Home, OrganizationList, Splash, Login, Register, SpeakerQueue } from './src'
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Firebase } from '@api';
import codePush from 'react-native-code-push';
import firebase from "react-native-firebase";
import { useGlobal } from '@store'

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

const Stack = createStackNavigator();
const HomeMainStack = createStackNavigator();
const SpeakerMainStack = createStackNavigator();

const AppMain = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [role, setRole] = useState('')
  const [register, setRegister] = useState(false)
  // const [user, setUser] = useState(null)
  const [globalState, globalActions] = useGlobal();
  const [authed, setAuthed] = useState(false)
  const { user, setOrganization } = globalState

  useEffect(() => {

    function auth() {
      firebase.auth().onAuthStateChanged(async user => {
        if (!user) {
          // console.log('the user was signed out!')
          setRegister(false)
          setAuthed(false)
          // setUser(null)
          globalActions.user.setUser(null)
          setRole('')
        }else if (user){
          setAuthed(true)
        }
      });
    }

    Firebase.shared.checkCurrentUser()
      .then(user => {

        if (!user) {
          globalActions.user.setUser(null)
          setIsLoading(false)
          setRole('')
          return
        }
        globalActions.user.setUser(user)
        if (user.setOrganization) {
          globalActions.user.setOrganization(true)
        }
        setRole(user.role)
        // setUser(user)
        isLoading && setIsLoading(false)
      })
      .catch(err => alert(`An error occurred ${err}`));

    auth()
  }, [authed])

  const handlesetUser = (user) => {
    // setUser(user)
    // setRole(user.role)
    if (user) {
      globalActions.user.setUser(user)
    }


  }

  const handleRegisterRoute = (val) => {
    setRegister(val)
  }

  function SpeakerStack() {
    return (
      <SpeakerMainStack.Navigator>
        <SpeakerMainStack.Screen name="Profile" component={Profile} />
        {/* <SpeakerMainStack.Screen name="Settings" component={Settings} /> */}
      </SpeakerMainStack.Navigator>
    );
  }

  function HomeStack() {
    return (
      <HomeMainStack.Navigator>
        <Stack.Screen name="Home">
          {(props) => <Home {...props} signedInuser={user} registerRoute={(val) => handleRegisterRoute(val)} onSignIn={handlesetUser} />}
        </Stack.Screen>
        {/* <HomeMainStack.Screen name="Home" component={Home} /> */}
        {/* <HomeMainStack.Screen name="Settings" component={Settings} /> */}
      </HomeMainStack.Navigator>
    );
  }

  return (
    <NavigationNativeContainer>
      <Stack.Navigator
        headerMode="none"
        mode="modal"
        initialRouteName={user ? "Home" : "Login"}
      >
        {/* {console.log('--this is the user role', role)} */}
        {/* <Stack.Screen name="Main" component={HomeStack} /> */}
        {/* {console.log('this is the user', user)} */}
        {
          user === null
            ? <><Stack.Screen name="Login">
              {(props) => <Login {...props} registerRoute={(val) => handleRegisterRoute(val)} onSignIn={handlesetUser} />}
            </Stack.Screen>
              <Stack.Screen name="Organization1" component={OrganizationList} />
              <Stack.Screen name="SpeakerQueue" signedInuser={user} component={SpeakerQueue} />
            </>
            : <>
              <Stack.Screen name="Home">
                {(props) => <Home {...props} signedInuser={user} registerRoute={(val) => handleRegisterRoute(val)} onSignIn={handlesetUser} />}
              </Stack.Screen>
              <Stack.Screen name="Register">
                {(props) => <Register {...props} registerRoute={(val) => handleRegisterRoute(val)} onSignIn={handlesetUser} />}
              </Stack.Screen>

              <Stack.Screen name="Speaker" component={SpeakerStack} />

              <Stack.Screen name="Organization1" component={OrganizationList} />
              <Stack.Screen name="SpeakerQueue" signedInuser={user} component={SpeakerQueue} />

            </>
        }




      </Stack.Navigator>

      {/* <Stack.Navigator
        headerMode="none"
      >
        {isLoading ? (
          <Stack.Screen name="Splash" component={Splash} />
        )
          : user === null ? (
            // Notoken found, user isn't signed in
            register
              ? <Stack.Screen name="Register">
                {() => <Register registerRoute={(val) => handleRegisterRoute(val)} onSignIn={handlesetUser} />}
              </Stack.Screen>
              :
              <Stack.Screen name="Login">
                {() => <Login registerRoute={(val) => handleRegisterRoute(val)} onSignIn={handlesetUser} />}
              </Stack.Screen>
          )
            : (
              <Stack.Screen name="Home" component={Home} />
            )}


        <Stack.Screen name="Organization1" component={OrganizationList} />
      </Stack.Navigator> */}
    </NavigationNativeContainer>
    // <Home />
  );
};

App = codePush(codePushOptions)(AppMain);

export default App;
