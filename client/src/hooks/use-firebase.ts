import firebase from "firebase/app";
import "firebase/storage";

import environment from "../config";

if (!firebase.apps.length) {
  firebase.initializeApp(environment.firebase);
}

export const fbase = firebase;
export const storage = firebase.storage();