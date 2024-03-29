import firebase from 'react-native-firebase';
function uploadPhoto(uri, uploadUri) {


  return new Promise(async (res, rej) => {

    const ref = firebase.storage().ref(uploadUri);
    const unsubscribe = ref.putFile(uri).on(
      'state_changed',
      state => {console.log('This is the file uploading', state)},
      err => {
        unsubscribe();
        rej(err);
      },
      async () => {
        unsubscribe(); 
        const url = await ref.getDownloadURL();
        res(url);
      },
    );
  });
}

export default uploadPhoto;