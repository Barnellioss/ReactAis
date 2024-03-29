import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore"



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);


export const firebaseUserDatesColumn = collection(firebaseDB, 'dates');
export const firebaseUserInfo = collection(firebaseDB, 'userInfo');
export const firebaseGroupsInfo = collection(firebaseDB, 'groups');
export const firebaseSubjects = collection(firebaseDB, 'subjects');
export const firebaseSubjectsTimetable = collection(firebaseDB, 'subjectsTimetable');






