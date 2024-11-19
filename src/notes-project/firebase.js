import { initializeApp } from "firebase/app";
import 

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