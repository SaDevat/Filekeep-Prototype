import * as firebase from "firebase";

import { FirebaseConfig } from "../config/keys";
firebase.initializeApp(FirebaseConfig);

export const database = firebase.database().ref();
export const storage = firebase.storage().ref();
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const per = firebase.auth.Auth.Persistence.LOCAL;
