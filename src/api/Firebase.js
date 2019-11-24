import firebase from "react-native-firebase";
import uuid from 'uuid';
import uploadPhoto from './uploadPhoto';



const collectionName = 'users';
const collectionOrg = 'organizations'

const queueList = 'queueList'
const authorized = 'authorizedStaff'
const timeTrack = 'timeTrack'

class Firebase {

  constructor() {
    // Listen for auth

    // Making sure we get timeStamps
    firebase.firestore().settings({ timestampsInSnapshots: true });

    //Android specific notifications setup channel
    const channel = new firebase.notifications.Android.Channel('ZOECoor-channel', 'Notification Channel', firebase.notifications.Android.Importance.Max)
      .setDescription('Zoe LA Stage Countdown notifications');

    // Create the channel
    firebase.notifications().android.createChannel(channel);
  }

  async signOut() {
    await firebase.auth().signOut()
    return
  }

  async signInAnonymously() {
    try {
      await firebase.auth().signInAnonymously();
      console.log('signed in anonymous')
    } catch (e) {
      switch (e.code) {
        case 'auth/operation-not-allowed':
          console.log('Enable anonymous in your firebase console.');
          break;
        default:
          console.error(e);
          break;
      }
    }
  }

  async checkCurrentUser() {
    return this.userCollection.doc(this.uid)
      .get()
      .then((doc) => {
        // console.log('this is the data', doc.data())
        if (!doc.exists) {
          return Promise.reject(new Error('User does not exist!'))
        } else {
          const user = doc.data()
          console.log('this is the user that was found', user)
          // resolve(user)
          return user

        }
      })
      .catch(error => {
        if (error.message.includes('does not exist')) {
          console.log(error.message);
        } else {
          console.log('Transaction failed: ', error);
        }
      });
  }

  sendPhoneNumber = (phoneNumber) => {
    return new Promise(resolve => {

      firebase.auth().signInWithPhoneNumber(phoneNumber)
        .then(confirmResult => {
          if (confirmResult) {
            resolve(confirmResult)
          }
        })
        .catch(error => {
          resolve(error.message)
        })
    });
  }

  checkForUserUID = async () => {
    const doc = await this.userCollection.doc(this.uid).get()
    if (!doc.exists) {
      return false
      // console.log('user does not exist!')
    }

    return doc.data()

  }

  getCurrentNotificationToken = () => {
    firebase.messaging().requestPermission();
    // gets the device's push token
    firebase.messaging().getToken().then(token => {

      // stores the token in the user's document
      this.updateNotificationToken(token)
    });
    // firebase.messaging().onTokenRefresh(fcmToken => {
    //   this.updateNotificationToken(fcmToken)
    // });
  }

  updateNotificationToken = (token) => {
    // alert('The token should be updated in firebase')
    this.userCollection.doc(this.uid).update({ pushToken: token });
  }

  checkUserState = () => {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user)
        } else {
          resolve(null)
        }
      })
    });
  };

  confirmCode = (codeInput, confirmResult) => {
    if (confirmResult && codeInput.length) {
      const confirma = confirmResult
      return new Promise(resolve => {
        confirma.confirm(codeInput)
          .then((user) => {

            if (user) {
              resolve(user)
            } else {
              console.log('there was an error 125', err)
              resolve(error + 'error')
            }
          })
          .catch(err => {
            console.log('there was an error 130', err)
            resolve(err + 'error')
          })
      });
    }
  };

  retrieveOrgs = async () => {
    const docs = await this.orgCollection.get()
    if (docs.empty) {
      return [{ name: 'No Organizations!' }]
    }

    const array = docs.docs.map((doc) => {

      const dat = doc.data()
      const data = {
        ...dat
      }
      data.id = doc.id
      return data
    })

    return array

  }
  async retrieveOrganization() {
    return this.orgCollection.where('users', 'array-contains', this.uid).get()
      .then(docs => {
        if (docs.empty) {
          // alert('You have not chosen an organization!')
          return ''
        }
        return docs.docs[0].id
      })
      .catch(error => {
        console.log('Organization retrieval failed', error.message)
      });
    // console.log('this should be the organization id', orgs.docs[0].id)
  }

  retrieveSpeakers = async () => {

    const orgs = await this.orgCollection.where('users', 'array-contains', this.uid).get()
    // console.log('this should be the organization id', orgs.docs[0].id)
    if (orgs.empty) {
      alert('You have not chosen an organization!')
      return []
    }
    const collectionRef = await firebase.firestore().doc(`${collectionOrg}/${orgs.docs[0].id}`).collection(`speakerQueue`).get();
    // console.log('this is the speakerlist', collectionRef.docs[0].data())

    // const collectionRef = await firebase.firestore().doc(`${collectionOrg}/${orgs.docs[0].id}/speakerQueue/XhpnkVE4tezXrONFejJz`).get();
    // console.log('this is the speaker single', collectionRef.data())
    const array = collectionRef.docs.map((doc) => {

      const dat = doc.data()
      const data = {
        ...dat
      }
      data.id = doc.id
      return data
    })

    return array

  }

  addNewSpeaker = async (data) => {
    const orgs = await this.orgCollection.where('users', 'array-contains', this.uid).get()
    console.log('this should be the organization id', orgs.docs[0].id)
    if (orgs.empty) {
      alert('You have not chosen an organization!')
      return []
    }
    const documentRef = await firebase.firestore().doc(`${collectionOrg}/${orgs.docs[0].id}`).collection(`speakerQueue`).add({
      // name: 'Ada Lovelace',
      // age: 30,
      data
    });
  }

  deleteSpeaker = async (data) => {

    const orgs = await this.orgCollection.where('users', 'array-contains', this.uid).get()
    console.log('this should be the organization id', orgs.docs[0].id)
    if (orgs.empty) {
      alert('You have not chosen an organization!')
      return []
    }
    const documentRef = await firebase.firestore().doc(`${collectionOrg}/${orgs.docs[0].id}/speakerQueue/${data}`).delete();
  }

  addUserToOrg = async (orgUID, currUsers) => {
    await this.orgCollection.doc(orgUID).update({ users: currUsers })
    if (currUsers.includes(this.uid)) {
      await this.userCollection.doc(this.uid).update({ setOrganization: true })
      return true
    } else {
      await this.userCollection.doc(this.uid).update({ setOrganization: false })
      return false
    }
  }

  findOrganizations

  getAllActiveUsers = () => {
    return new Promise(resolve => {

      const ref = firebase.firestore().collection('users')

      firebase
        .firestore()
        .runTransaction(async transaction => {
          const doc = await transaction.get(ref)

          return doc
        })
        .then(users => {
          console.log(
            `Transaction successfully retrieved these users'${users}'.`
          );
        })
        .then()
    });
  }

  // Update Data
  uploadPhotoAsync = async uri => {
    const path = `${this.userCollection}/${this.uid}/${uuid.v4()}.jpg`;
    return uploadPhoto(uri, path);
  };

  updateUser = async (user, image) => {
    const doc = await this.userCollection.doc(this.uid).get()
    const updateDic = {
      uid: this.uid,
      number: this.number,
      ...user,
    }

    // Upload image and add if there is one
    if (image && image.path) {
      const remoteUri = await this.uploadPhotoAsync(image.path);
      updateDic.image = remoteUri
    }

    if (doc.exists) {

      await this.userCollection.doc(this.uid).update(updateDic)
      const user = await this.userCollection.doc(this.uid).get()
      console.log('the user update', user)
      return user.data()

    } else {
      await this.userCollection.doc(this.uid).set(updateDic)
      const user = await this.userCollection.doc(this.uid).get()
      console.log('the user set', user)
      return user.data()
    }
  }

  updateOrganization= async (uid, data) => {
    return await this.orgCollection.doc(uid).update(data)
    //   const user = await this.userCollection.doc(this.uid).get()
    //   console.log('the user update', user)
    //   return user.data()

    // const doc = await this.orgCollection.doc(uid).get()
    // const updateDic = {
    //   uid: this.uid,
    //   number: this.number,
    //   ...user,
    // }

    // // Upload image and add if there is one
    // if (image && image.path) {
    //   const remoteUri = await this.uploadPhotoAsync(image.path);
    //   updateDic.image = remoteUri
    // }

    // if (doc.exists) {

    //   await this.userCollection.doc(this.uid).update(updateDic)
    //   const user = await this.userCollection.doc(this.uid).get()
    //   console.log('the user update', user)
    //   return user.data()

    // } else {
    //   await this.userCollection.doc(this.uid).set(updateDic)
    //   const user = await this.userCollection.doc(this.uid).get()
    //   console.log('the user set', user)
    //   return user.data()
    // }
  }

  // Helpers
  get userCollection() {
    return firebase.firestore().collection(collectionName);
  }

  get orgCollection() {
    return firebase.firestore().collection(collectionOrg);
  }

  get authorize() {
    return firebase.firestore().collection(authorized)
  }

  get queueCollection() {
    return firebase.firestore().collection(queueList);
  }

  get adminQueueCollection() {
    return firebase.firestore().collection(adminQueueList);
  }

  get adminCheckInCollection() {
    return firebase.firestore().collection(adminCheckInList);
  }

  get timeCollection() {
    return firebase.firestore().collection(timeTrack);
  }

  get queueTimeTrack() {
    return firebase.firestore().collection(queueTimeTrack).doc('timeSet')
  }

  get requestCollection() {
    return firebase.firestore().collection(requestName);
  }

  get notificationCollection() {
    return firebase.firestore().collection(notificationName);
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get number() {
    return (firebase.auth().currentUser || {}).phoneNumber;
  }

  get timestamp() {
    return Date.now();
  }

}

//Makes the same instance stay in memory
Firebase.shared = new Firebase();

export default Firebase;
