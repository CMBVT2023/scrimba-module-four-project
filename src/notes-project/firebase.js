import { initializeApp } from "firebase/app";
import { collection, getFirestore } from 'firebase/firestore'

import fireBaseSettings from './firebasesettings.json';

const firebaseConfig = {
  apiKey: fireBaseSettings.apiKey,
  authDomain: fireBaseSettings.authDomain,
  projectId: fireBaseSettings.projectId,
  storageBucket: fireBaseSettings.storageBucket,
  messagingSenderId: fireBaseSettings.messagingSenderId,
  appId: fireBaseSettings.appId
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
// To access the notes collection, you pass two arguments,
// One, the variable storing the database the collection is within,
// And two, a string specifying the path to access the collection.
export const notesCollection = collection(db, "notes")