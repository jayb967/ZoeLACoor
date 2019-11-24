import React from 'react'
import { Header, Icon } from 'react-native-elements';
import { Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Firebase } from '@api';
import { useGlobal } from '@store'

const HeaderTitle = ({ navigation, popOrg }) => {
  const [globalState, globalActions] = useGlobal();
  // const { user, setOrganization } = globalState

  const handleLogout = async () => {
    Firebase.shared.signOut()
    globalActions.user.setUser(null)
    popOrg && popOrg()
  }
  return (<Header
    ViewComponent={LinearGradient} // Don't forget this!
    linearGradientProps={{
      colors: ['black', 'white'],
      start: { x: 0, y: 1 },
      end: { x: 0, y: 0 },
    }}
    leftComponent={<Icon
      // raised
      name='home'
      // type='font-awesome'
      color='white'
      onPress={() => navigation.navigate('Home')} />}
    rightComponent={<Icon
      // raised
      name='cog'
      type='font-awesome'
      color='white'
      onPress={() => Alert.alert(
        'Settings',
        '',
        [
          { text: 'Sign Out', onPress: () => handleLogout() },
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },

        ],
        { cancelable: false }
      )} />}
    centerComponent={{ text: 'Organization', style: { fontSize: 23, color: '#fff' } }}
    containerStyle={{
      backgroundColor: '#3D6DCC',
      justifyContent: 'space-around',
    }}
  />)
}

export default HeaderTitle;