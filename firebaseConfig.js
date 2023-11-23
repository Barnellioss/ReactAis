import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore"
//import 'dotenv/config';

console.log(process.env);


// Your web app's Firebase configuration
/*
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
*/

/*
const firebaseConfig = {
  apiKey: EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: EXPO_PUBLIC_FIREBASE_APP_ID
};
*/


const firebaseConfig = {
  apiKey: "AIzaSyAN72A8sUt6mXpVm0klGhM47XVvpTZsdJs",
  authDomain: "nearly-4b507.firebaseapp.com",
  projectId: "nearly-4b507",
  storageBucket: "nearly-4b507.appspot.com",
  messagingSenderId: "773426294980",
  appId: "1:773426294980:web:68952c64c8eca48779d991"
};



// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);


export const firebaseUserDatesColumn = collection(firebaseDB, 'dates');
export const firebaseUserInfo = collection(firebaseDB, 'userInfo');
export const firebaseGroupsInfo = collection(firebaseDB, 'groups');



