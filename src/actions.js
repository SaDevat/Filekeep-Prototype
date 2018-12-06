import { database } from "./config/firebase";
import { storage } from "./config/firebase";
import { auth } from "./config/firebase";
import { provider } from "./config/firebase";
import { per } from "./config/firebase";

export const handlegoogleauth = () => {
  return async dispatch => {
    await auth.setPersistence(per);
    var result = await auth.signInWithPopup(provider);
    var updates = {};
    updates[result.user.uid + "/Main/lastsignin"] = Date.now();
    updates[result.user.uid + "/Main/title"] = result.user.displayName;
    database.update(updates);
    dispatch({ type: "signin", payload: result.user });
  };
};

export const signout = () => {
  return async dispatch => {
    auth.signOut();
    dispatch({ type: "signout" });
  };
};

export const syncjsonauto = node => {
  return async dispatch => {
    console.log("syncing with server");
    database.child(node).on("value", function(snapshot) {
      dispatch({ type: "jsonsyncauto", payload: snapshot.val() });
    });
  };
};

export const changenode = nodename => {
  return dispatch => {
    dispatch({ type: "changenode", payload: nodename });
  };
};

export const writenewtodb = (node, e) => {
  return dispatch => {
    if (e.key === "Enter") {
      var newpushkey = database.child(node + "/children").push().key;
      var updates = {};
      updates[node + "/children/" + newpushkey] = {
        title: e.target.value,
        active: true,
        focus: false
      };
      database.update(updates);
      e.target.value = "";
    }

    dispatch({ type: "writenewtodb" });
  };
};

export const editnameindb = (node, e) => {
  return dispatch => {
    if (e.key === "Enter") {
      var updates = {};
      updates[node + "/title"] = e.target.value;
      database.update(updates);
    }
  };
};

export const editnameindbf = (node, e) => {
  return dispatch => {
    var updates = {};
    updates[node + "/title"] = e.target.value;
    database.update(updates);
  };
};

export const uploadnewtostr = (node, e) => {
  return dispatch => {
    var file = e.target.files[0];
    var newpushkey = database.child(node).push().key;
    var updates = {};
    updates[node + "/files/" + newpushkey] = {
      name: file.name
    };
    database.update(updates);
    storage
      .child("files/" + node + "/" + newpushkey)
      .put(file)
      .then(function() {
        storage
          .child("files/" + node + "/" + newpushkey)
          .getDownloadURL()
          .then(function(url) {
            var urlupdate = {};
            urlupdate[node + "/files/" + newpushkey] = {
              download: url,
              name: file.name
            };
            database.update(urlupdate);
          });
      });
    e.target.value = "";
  };
};

export const setstatus = (status, node, identifier) => {
  return dispatch => {
    var updates = {};
    updates["/" + identifier] = status;
    database.child(node).update(updates);
  };
};
