import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyANMxsu01zYq988-5-BYGDZ_mCItskV3ww",
    authDomain: "osaki-sushi.firebaseapp.com",
    projectId: "osaki-sushi",
    storageBucket: "osaki-sushi.appspot.com",
    messagingSenderId: "708889321801",
    appId: "1:708889321801:web:fa48adddd760a52baefa98"
  };

  const fireb = firebase.initializeApp(firebaseConfig);
  const stores = fireb.firestore();


  export default stores
