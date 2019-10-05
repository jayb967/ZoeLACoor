import firebase from "react-native-firebase";
import uuid from 'uuid';



const collectionName = 'users';
const queueList = 'queueList'
const authorized = 'authorizedStaff'
const timeTrack = 'timeTrack'

class Firebase {

  constructor() {
    // Listen for auth
    firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
    });
    // Making sure we get timeStamps
    firebase.firestore().settings({ timestampsInSnapshots: true });

    //Android specific notifications setup channel
    const channel = new firebase.notifications.Android.Channel('CG-channel', 'Notification Channel', firebase.notifications.Android.Importance.Max)
      .setDescription('Crazy Girls notifications');

    // Create the channel
    firebase.notifications().android.createChannel(channel);
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
    this.collection.doc(this.uid).update({ pushToken: token });
  }

  linePassPayNotification = async () => {
    return new Promise(resolve => {

      const ref = this.notificationCollection.doc(this.timestamp.toString())

      firebase.firestore()
        .runTransaction(async transaction => {

          transaction.set(ref, {
            uid: this.uid,
            title: "Crazy Girls!",
            message: "Meet with DJ immediately for line pass pay!",
            timeStamp: this.timestamp
          });
          const userRef = await transaction.get(ref)
          return userRef

        })
        .then(done => {
          console.log('the transaction is done to send the notification', done)
          resolve(done)
        })
        .catch(err => {
          console.log('there was an error sending the notification', err)
          return resolve(null)
        })
    })
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
      return new Promise(resolve => {
        confirmResult.confirm(codeInput)
          .then((user) => {

            if (user) {
              resolve(user)
            } else {
              resolve(error + 'error')
            }
          })
          .catch(err => {
            resolve(err + 'error')
          })
      });
    }
  };

  checkForPhone = (phoneNumber) => {
    return new Promise(resolve => {
      //This queries through all collections to find number
      const number = phoneNumber
      const checkPhone = this.authorize

      checkPhone.where("number", "==", number).get()
        .then(snapshot => {
          if (snapshot.empty) {
            resolve(null)
            return
          }

          resolve(snapshot.docs[0])
        })

    })
  }

  signOut = () => {
    return new Promise(resolve => {
      firebase.auth().signOut();
      resolve()
    })

  }

  sendEmailWithPassword = (email) => {
    return new Promise(resolve => {
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          console.warn('Email with new password has been sent');
          resolve(true);
        }).catch(error => {
          switch (error.code) {
            case 'auth/invalid-email':
              console.warn('Invalid email address format');
              break;
            case 'auth/user-not-found':
              console.warn('User with this email does not exist');
              break;
            default:
              console.warn('Check your internet connection');
          }
          resolve(false);
        });
    })
  };

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

  createDJCheckInUser = async (role) => {
    return new Promise(resolve => {

      const ref = this.collection.doc(this.uid)

      firebase.firestore()
        .runTransaction(async transaction => {
          const deviceInfo = getDeviceInfo()
          const userRef = await transaction.get(ref)

          transaction.set(ref, {
            role: role,
            checkIns: 0,
            skips: 0,
            isCheckedIn: false,
            isTony: false,
            number: this.number,
            uid: this.uid,
            timestamp: this.timestamp,
            device: deviceInfo
          });
          return userRef
        })
        .then(done => {
          resolve(done)
        })
        .catch(err => { return resolve(null) })
    })
  }

  // Upload Data
  uploadPhotoAsync = async uri => {
    const path = `${this.collection}/${this.uid}/${uuid.v4()}.jpg`;
    return uploadPhoto(uri, path);
  };

  updateUser = async (user, image) => {

    return new Promise(resolve => {
      const ref = this.collection.doc(this.uid)

      firebase.firestore()
        .runTransaction(async transaction => {

          const deviceInfo = getDeviceInfo()
          const userRef = await transaction.get(ref)

          // set or update user
          if (!userRef.exists) {
            if (image != null) {
              const remoteUri = await this.uploadPhotoAsync(image.path);

              transaction.set(ref, {
                uid: this.uid,
                number: this.number,
                rating: 1,
                timestamp: this.timestamp,
                ...user,
                avatar: remoteUri,
                passesToday: 0,
                device: deviceInfo
              });
              return userRef
            } else {
              transaction.set(ref, {
                uid: this.uid,
                number: this.number,
                timestamp: this.timestamp,
                ...user,
                passesToday: 0,
                device: deviceInfo
              });
              return userRef
            }
          } else
            if (image != null) {
              const remoteUri = await this.uploadPhotoAsync(image.path);
              transaction.update(ref, {
                uid: this.uid,
                number: this.number,
                ...user,
                passesToday: 0,
                avatar: remoteUri,
                device: deviceInfo
              });
              return userRef
            } else {
              transaction.update(ref, {
                uid: this.uid,
                number: this.number,
                ...user,
                passesToday: 0,
                device: deviceInfo
              });
            }
          return userRef

        })
        .then(result => {
          if (result) {
            resolve(true)
          } else { resolve(false) }
        })
        .catch(err => console.log('There was an error updating the server:', err.message))



    });

  }

  // Helpers
  get collection() {
    return firebase.firestore().collection(collectionName);
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

  get reviewsCollection() {
    return firebase.firestore().collection(reviewsName);
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
