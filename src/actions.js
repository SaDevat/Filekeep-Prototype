import { database } from "./config/firebase";
import { storage } from "./config/firebase";

export const testfire = () => {
  return async dispatch => {
    dispatch({ type: "testfire" });
  };
};

export const testupload = e => {
  return async dispatch => {
    if (e.target.files) {
      var file = e.target.files[0];
      storage.child("test/" + file.name).put(file);
      dispatch({ type: "testupload", payload: file.name });
    } else {
      dispatch({ type: "testuploaderror" });
    }
  };
};

export const testwrite = e => {
  return async dispatch => {
    database.child("test").set({ msg: e.target.value });
    dispatch({ type: "testwrite", payload: e.target.value });
  };
};

export const testsync = msg => {
  return async dispatch => {
    dispatch({ type: "testsync", payload: msg });
  };
};

export const syncjsonauto = (node, oldnode) => {
  return async dispatch => {
    database.child("json/" + oldnode).off();
    database.child("json/" + node).on("value", function(snapshot) {
      dispatch({ type: "jsonsyncauto", payload: snapshot.val() });
    });
  };
};

export const changenode = () => {
  return dispatch => {
    dispatch({ type: "changenode" });
  };
};
