import firebase from 'firebase';
import 'firebase/firestore'
import 'firebase/auth'



const firebaseConfig = {
    apiKey: "AIzaSyBpxCE_-C1v0ez2r4YpEQxbE2_B1s0kl7E",
    authDomain: "voip2g.firebaseapp.com",
    databaseURL: "https://voip2g-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "voip2g",
    storageBucket: "voip2g.appspot.com",
    messagingSenderId: "976733799086",
    appId: "1:976733799086:web:33fe1613964320e6f0233f"
  };

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();


const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };

export default firebase