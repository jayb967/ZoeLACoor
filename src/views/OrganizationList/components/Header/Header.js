import React from 'react'
import { Header, Icon } from 'react-native-elements';
import { Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const HeaderTitle = ({ navigation }) => {
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
      onPress={() =>  Alert.alert(
        'Alert!',
        'Called the settings!',
        [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            // { text: 'Continue', onPress: () => this.skipConfirm() },
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