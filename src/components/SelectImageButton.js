import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import {w, h, totalSize} from '../helpers/Dimension';
import Icon from 'react-native-vector-icons/FontAwesome';

const SelectImageButton = ({image, onTap, color}) => {

    return (

                <View>
                  <TouchableOpacity
                   onPress={onTap}
                   style={styles.button}
                  >
                  {image ? <Image style={{width: 100, height: 100}} source={{uri: image}} /> : 
                <React.Fragment>
                    {/* <Ionicons name='ios-add-circle-outline' style={{ color: 'white', fontSize: 60 }} /> */}
                    <Icon
                                name='plus'
                                size={40}
                                color={color}
                            />
                    <Text style={styles.text}>Upload Image</Text>
                </React.Fragment>
                }
                    
                  </TouchableOpacity>
                </View>
     
    );
}


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color:'grey',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: h(2)
  },
  image: {
    height: h(7),
  },
});

export default SelectImageButton;