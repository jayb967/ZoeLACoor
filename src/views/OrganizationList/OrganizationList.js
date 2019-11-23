import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    ActivityIndicator
} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Svg, { Ellipse } from "react-native-svg";


import { Firebase } from '@api';
import { useGlobal } from '@store'
import { Header } from './components'



const OrganizationList = ({ navigation }) => {
    const [organizations, setOrganizations] = useState([])
    const [globalState, globalActions] = useGlobal();
    const { user, setOrganization } = globalState

    useEffect(() => {
        organizations.length === 0 && getOrganizations()
        
    })

    async function getOrganizations() {
        const orgs = await Firebase.shared.retrieveOrgs()
        setOrganizations(orgs)
    }

    const doesContainUser = (org) => {
        if (org.users.length == 0) return false
        let present = false
        const uid = Firebase.shared.uid
        org.users.forEach((item) => {
            if (item === uid) {
                present = true
            }
        })
        return present
    }

    async function handleAddUser(org) {
        let users = org.users || []
        const uid = Firebase.shared.uid
        if (users.includes(uid)) {
            const asdf = users.filter((item) => {
                return item != uid
            })
            users = asdf
        }
        else {
            if (setOrganization) {
                alert('You are already a part of an organization!')
                return
            } else {
                users.push(uid)
            }
        }

        const added = await Firebase.shared.addUserToOrg(org.id, users)
        globalActions.user.setOrganization(added)

        getOrganizations()
    }

    return (
        <>
            <View style={styles.body}>
                <Svg viewBox="50 -80 400 400" style={styles.ellipse}>
                    <Ellipse
                        strokeWidth={1}
                        fill="gray"
                        cx={430}
                        cy={378}
                        rx={429}
                        ry={378}
                    />
                </Svg>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <Header navigation={navigation} />
                    <View >
                        {organizations.length < 1
                            ? <ActivityIndicator size="large" style={styles.spinner} color='white' />
                            : organizations.map((org, i) => <Card
                                key={i}
                                title={org.organization}
                                image={{ uri: org.image }}
                                containerStyle={{
                                    borderRadius: 12,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 5, height: 5 },
                                    shadowOpacity: 0.6,
                                    shadowRadius: 6,
                                    margin: 20,
                                    borderWidth: doesContainUser(org) ? 2 : 0,
                                    borderColor: doesContainUser(org) ? 'rgba(101,33,108 ,100)' : 'white'
                                }}
                            >
                                <Button
                                    // icon={<Icon name='apartment' color='#ffffff' />}
                                    onPress={() => handleAddUser(org)}
                                    buttonStyle={{ borderRadius: 12, marginLeft: 20, marginRight: 20, marginBottom: 0, backgroundColor: 'rgba(101,33,108 ,100)' }}
                                    title={doesContainUser(org) ? 'Leave' : 'Join'} />
                            </Card>)}
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    ellipse: {
        top: 86,
        left: 0,
        width: 859,
        height: 757,
        position: "absolute"
    },
    body: {
        height: '100%',
        width: '100%'
    },
    scrollView: {
        height: '100%',
        width: '100%'
    }
})
export default OrganizationList;