import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

// import LinearGradient from 'react-native-linear-gradient';

const TimeRange = props => {
    return (<View style={styles.service}>
        {/* <Text style={styles.serviceTime}>Service Time</Text>
        <Text style={styles.text9}>12:03pm - 1:30pm</Text> */}
      </View>)
}
const styles = StyleSheet.create({
    service: {
        // width: 292,
        height: 72,
        marginTop: 10,
        // marginLeft: 34
      },
    serviceTime: {
        color: "white",
        fontSize: 20,
        // fontFamily: "times-new-roman-regular",
        fontWeight: '300',
        textAlign: "center",
        alignSelf: "center",
        marginTop: 12
      },
      text9: {
        color: "white",
        fontWeight: '500',
        fontSize: 20,
        
        // fontFamily: "roboto-900",
        alignSelf: "center",
        marginTop: 12
      },
})

export default TimeRange;