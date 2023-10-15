// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyATOMLl8RHWT8UqQEjMcW_fAdnQZiKRMWE",
    authDomain: "tapi-92afd.firebaseapp.com",
    databaseURL: "https://tapi-92afd-default-rtdb.firebaseio.com",
    projectId: "tapi-92afd",
    storageBucket: "tapi-92afd.appspot.com",
    messagingSenderId: "385737615101",
    appId: "1:385737615101:web:1e03159169e39b2016c094",
    measurementId: "G-DPJWLXGN7K"
};

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*
const firebaseConfig = {
    apiKey: "AIzaSyBRMBmT02XPYhwNRBQbXWuT9--xrZZbBs4",
    authDomain: "penny-friend.firebaseapp.com",
    databaseURL: "https://penny-friend-default-rtdb.firebaseio.com",
    projectId: "penny-friend",
    storageBucket: "penny-friend.appspot.com",
    messagingSenderId: "1003355203862",
    appId: "1:1003355203862:web:5a48e441ff61113e9ec837",
    measurementId: "G-XNN25HS4X1"
};
*/

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
logEvent(analytics, 'login');
// Initialize Realtime Database and get a reference to the service
export const databaseRef = getDatabase(app);
