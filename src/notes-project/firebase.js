import { initializeApp } from "firebase/app";
import { getFireStore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCej-i0yoJEVsuKiPJG1vckDDaBniIlDUE",
  authDomain: "scrimba-react-notes-25b85.firebaseapp.com",
  projectId: "scrimba-react-notes-25b85",
  storageBucket: "scrimba-react-notes-25b85.firebasestorage.app",
  messagingSenderId: "1053041292304",
  appId: "1:1053041292304:web:97d43303f12c4da9b58695"
};

const app = initializeApp(firebaseConfig);
const db = getFireStore(app);

//? To get a collection, you pass in the two arguments
//? One pointing towards the db or the variable storing the db
//? And the other is a string specifying the path of the collection.
const notesCollection = collection(db, "notes")