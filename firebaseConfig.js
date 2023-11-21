import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore"




// Your web app's Firebase configuration
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



