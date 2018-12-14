import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

import { FirebaseConfig } from "../config/keys";
firebase.initializeApp(FirebaseConfig);

export const database = firebase.database().ref();
export const connected = firebase.database().ref(".info/connected");
export const storage = firebase.storage().ref();
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const per = firebase.auth.Auth.Persistence.LOCAL;

// const fs = firebase.firestore();
