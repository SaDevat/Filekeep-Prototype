import * as firebase from "firebase";

import { FirebaseConfig } from "../config/keys";
firebase.initializeApp(FirebaseConfig);

export const database = firebase.database().ref();
export const storage = firebase.storage().ref();
