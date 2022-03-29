import { initializeApp, FirebaseOptions } from "firebase/app";
import { connectAuthEmulator, getAuth, GoogleAuthProvider } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
export const functions = getFunctions(firebaseApp);

if (window.location.hostname === 'localhost') {
  connectFirestoreEmulator(firestore, 'localhost', 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectStorageEmulator(storage, "localhost", 9199);
}
