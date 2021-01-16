// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBhwaJlv7ySDoAUpBe60UaaaRQGuNSTZ-Y",
    authDomain: "the-image-repo.firebaseapp.com",
    databaseURL: "https://the-image-repo-default-rtdb.firebaseio.com",
    projectId: "the-image-repo",
    storageBucket: "the-image-repo.appspot.com",
    messagingSenderId: "93561449200",
    appId: "1:93561449200:web:a02ec7b1368af69ff73035",
    measurementId: "G-SYKSM754PB"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };