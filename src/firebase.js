
import firebase from "firebase";




// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdGktyLTXUMygwxa_OAa_AuLhr8NZ9JGo",
    authDomain: "myshop-5a69b.firebaseapp.com",
    projectId: "myshop-5a69b",
    storageBucket: "myshop-5a69b.appspot.com",
    messagingSenderId: "45015617064",
    appId: "1:45015617064:web:ad2b8b06109d1bb1462f1d"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore()
const auth = firebase.auth()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export { auth, googleAuthProvider, facebookAuthProvider }
export default db