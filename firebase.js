import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAFlXCoa3OEq3gRvMOQjj_-P73EO7_N6jA",
    authDomain: "akkytalk.firebaseapp.com",
    databaseURL: "https://akkytalk.firebaseio.com",
    projectId: "akkytalk",
    storageBucket: "akkytalk.appspot.com",
    messagingSenderId: "898376088712",
    appId: "1:898376088712:web:05d645a6206ef1b377733d",
    measurementId: "G-766YWC4KNX"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();



export const firebaseAnalytics = firebase.analytics();

export {auth, storage, db};
  export default db;