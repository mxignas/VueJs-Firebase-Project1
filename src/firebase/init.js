import firebase from 'firebase'
import firestore from 'firebase'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCJt1FWE4Ew6mvS0h1pW7yJwh010k25w3Q",
    authDomain: "udemy-vue-smoothies-project.firebaseapp.com",
    databaseURL: "https://udemy-vue-smoothies-project.firebaseio.com",
    projectId: "udemy-vue-smoothies-project",
    storageBucket: "udemy-vue-smoothies-project.appspot.com",
    messagingSenderId: "471145480297",
    appId: "1:471145480297:web:d5e8062ab98ccb568862f8",
    measurementId: "G-2348XFZ11Q"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
//firebaseApp.firestore().settings({ timestampsInSnaphsots: true})
firebase.analytics();

// export firestore database
export default firebaseApp.firestore()