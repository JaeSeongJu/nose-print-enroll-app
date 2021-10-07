import firebase from "firebase/app";
import "firebase/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAcfpLjsZk0UVPfzB08OA73yela72dkjAw",
  authDomain: "test-data-594c8.firebaseapp.com",
  projectId: "test-data-594c8",
  storageBucket: "test-data-594c8.appspot.com",
  messagingSenderId: "506730135259",
  appId: "1:506730135259:web:aef172782e5f2e3706d6fe",
});

const storage = firebaseApp.storage();

export default storage;
