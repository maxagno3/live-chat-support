import firebase from "firebase";

// Web-app's firebase configuration.

const firebaseConfig = {
  apiKey: "AIzaSyDGEORo8XyPiwIUEW2Y4h-VuplAmT70dzU",
  authDomain: "live-chat-support-f23b6.firebaseapp.com",
  databaseURL: "https://live-chat-support-f23b6.firebaseio.com",
  projectId: "live-chat-support-f23b6",
  storageBucket: "live-chat-support-f23b6.appspot.com",
  messagingSenderId: "942548735691",
  appId: "1:942548735691:web:b02efc86cbfe0138d6ed4e",
  measurementId: "G-15HS8CYB95",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth;
export const db = firebase.database();
