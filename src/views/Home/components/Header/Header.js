import React from 'react'
import { Header, Icon } from 'react-native-elements';
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
      name='th-list'
      type='font-awesome'
      color='white'
      onPress={() => navigation.push('Organization')} />}
    rightComponent={<Icon
      // raised
      name='plus'
      type='font-awesome'
      color='white'
      onPress={() => navigation.push('Login')} />}
    centerComponent={{ text: 'ZOE T-Minus', style: { fontSize: 23, color: '#fff' } }}
    containerStyle={{
      backgroundColor: '#3D6DCC',
      justifyContent: 'space-around',
    }}
  />)
}

export default HeaderTitle;