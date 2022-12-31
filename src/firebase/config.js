import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyDnFNCBwLdMuQXh-81fyGEQ9TphtxWlrlw",
  authDomain: "vue3-istakip.firebaseapp.com",
  projectId: "vue3-istakip",
  storageBucket: "vue3-istakip.appspot.com",
  messagingSenderId: "890968516370",
  appId: "1:890968516370:web:1626f6df8198c21dddb5cb",
  measurementId: "G-G9LWW884JW"
};

firebase.initializeApp(firebaseConfig)

const firestoreRef = firebase.firestore()
const authRef = firebase.auth()
const storageRef = firebase.storage()
const tarih=firebase.firestore.FieldValue.serverTimestamp

export {firestoreRef,authRef,tarih,storageRef}