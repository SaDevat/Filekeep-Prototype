import { database } from "./config/firebase";
import { connected } from "./config/firebase";
import { storage } from "./config/firebase";
import { auth } from "./config/firebase";
import { provider } from "./config/firebase";
import { per } from "./config/firebase";

import mixpanel from "./config/mixpanel";

export const seterrordisplay = e => {
  return dispatch => {
    dispatch({ type: "seterrordisplay", payload: e });
  };
};

export const assignuser = (id, name, node, action) => {
  return dispatch => {
    try {
      var update = {};
      if (action === "add") {
        update[node + "/currentusers/" + id] = name;
      } else if (action === "delete") {
        update[node + "/currentusers/" + id] = null;
      }
      database.update(update);
    } catch (error) {
      dispatch({
        type: "seterrordisplay",
        payload: { message: "Cannot assign users at this moment", status: "r" }
      });
    }
  };
};

export const handleoffline = () => {
  return dispatch => {
    connected.on("value", snap => {
      if (snap.val()) {
        dispatch({
          type: "seterrordisplay",
          payload: { message: "Welcome back!", status: "g", duration: 1500 }
        });
      } else {
        dispatch({
          type: "seterrordisplay",
          payload: {
            message:
              "Disconnected from the server. You can continue working, changes will be synced when you are online. Please check your internet connection",
            status: "r",
            duration: 10000
          }
        });
      }
    });
  };
};

export const handlegoogleauth = () => {
  return async dispatch => {
    await auth.setPersistence(per);
    var result = await auth.signInWithPopup(provider);
    var updates = {};
    console.log(result.user);
    mixpanel.identify(result.user.uid);
    mixpanel.people.set({
      $email: result.user.email,
      $name: result.user.displayName,
      $creationtime: result.user.metadata.creationTime
    });
    mixpanel.track("Signed In");
    updates["users/" + result.user.uid + "/lastsignin"] = Date.now();
    updates["users/" + result.user.uid + "/name"] = result.user.displayName;
    updates["users/" + result.user.uid + "/email"] = result.user.email;
    database.update(updates);
    dispatch({ type: "signin", payload: result.user });
  };
};

export const createnewproject = (uid, name, e) => {
  return dispatch => {
    if (e.key === "Enter") {
      try {
        mixpanel.track("New Project Created");
        var newpushkey = database.child("projects").push().key;
        var updates = {};
        updates["projects/" + newpushkey + "/Main/title"] = e.target.value;
        updates["projects/" + newpushkey + "/allowedusers/" + uid] = name;
        updates["users/" + uid + "/projects/" + newpushkey] = e.target.value;
        database.update(updates);
        e.target.value = "";
      } catch (error) {
        seterrordisplay({
          message:
            "Cannot connect to the server, please ensure you have a working internet connection",
          status: "r"
        });
      }
    }
  };
};

export const shareproject = (uid, name, e) => {
  return async dispatch => {
    if (e.key === "Enter") {
      e.persist();
      try {
        var nameofproj = await database
          .child("projects/" + e.target.value)
          .once("value");
      } catch (error) {
        dispatch({
          type: "seterrordisplay",
          payload: { message: "cannot retrieve the project at this time" }
        });
      }
      if (
        nameofproj.val() &&
        nameofproj.val().Main &&
        nameofproj.val().Main.title &&
        !nameofproj.val().allowedusers.hasOwnProperty(uid)
      ) {
        var updates = {};
        updates["projects/" + e.target.value + "/allowedusers/" + uid] = name;
        updates[
          "users/" + uid + "/projects/" + e.target.value
        ] = nameofproj.val().Main.title;
        database.update(updates).then(function() {
          mixpanel.track("Shared Project");
        });
        e.target.value = "";
      } else if (
        nameofproj.val() &&
        nameofproj.val().Main &&
        nameofproj.val().Main.title &&
        nameofproj.val().allowedusers.hasOwnProperty(uid)
      ) {
        e.target.value = "";
        e.target.placeholder = "You already have access to that project";
        dispatch({
          type: "seterrordisplay",
          payload: { message: "You already have access to that project" }
        });
      } else {
        e.target.value = "";
        e.target.placeholder = "Please enter a valid key";
        dispatch({
          type: "seterrordisplay",
          payload: { message: "Please enter a valid key", status: "r" }
        });
      }
    }
  };
};

export const syncprojects = uid => {
  return dispatch => {
    mixpanel.identify(uid);
    mixpanel.track("App Opened");
    database.child("users/" + uid + "/projects").on("value", function(snap) {
      console.log("Welcome to Filekeep!");
      dispatch({ type: "syncjsonproject", payload: snap.val() });
    });
  };
};

export const chooseproject = id => {
  return dispatch => {
    dispatch({ type: "chooseproject", payload: id });
    dispatch({
      type: "seterrordisplay",
      payload: { message: "Loading...", duration: 1000 }
    });
  };
};

export const signout = () => {
  return async dispatch => {
    mixpanel.track("Signed Out");
    auth.signOut();
    dispatch({ type: "signout" });
  };
};

export const syncjsonauto = node => {
  return async dispatch => {
    mixpanel.track("Opened Project");
    database.child(node).on("value", function(snapshot) {
      dispatch({ type: "jsonsyncauto", payload: snapshot.val() });
    });
  };
};

export const syncteam = node => {
  return dispatch => {
    database.child(node).on("value", snap => {
      dispatch({ type: "syncteam", payload: snap.val() });
    });
  };
};

export const unsyncjson = node => {
  return dispatch => {
    database.child(node).off();
  };
};

export const changenode = nodename => {
  return dispatch => {
    mixpanel.track("Switched nodes");
    dispatch({ type: "changenode", payload: nodename });
  };
};

export const writenewtodb = (node, type, e) => {
  return dispatch => {
    if (e.key === "Enter") {
      try {
        mixpanel.track("Created new Compartment");
        var newpushkey = database.child(node + "/children").push().key;
        var updates = {};
        updates[node + "/children/" + newpushkey] = {
          title: e.target.value,
          active: true,
          focus: false,
          type: type
        };
        database.update(updates);
        e.target.value = "";
      } catch (error) {
        dispatch({
          type: "seterrordisplay",
          payload: { message: "Cannot write to server, please try again" }
        });
      }
    }
  };
};

export const editnameindb = (node, e) => {
  return dispatch => {
    if (e.key === "Enter") {
      try {
        var updates = {};
        updates[node + "/title"] = e.target.value;
        database.update(updates);
      } catch (error) {
        dispatch({
          type: "seterrordisplay",
          payload: { message: "Cannot write to server, please try again" }
        });
      }
    }
  };
};

export const editnameindbf = (node, e) => {
  return dispatch => {
    try {
      var updates = {};
      updates[node + "/title"] = e.target.value;
      database.update(updates);
    } catch (error) {
      dispatch({
        type: "seterrordisplay",
        payload: { message: "Cannot write to server, please try again" }
      });
    }
  };
};

export const uploadnewtostr = (node, e) => {
  return dispatch => {
    try {
      mixpanel.track("File Upload");
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
    } catch (error) {
      dispatch({
        type: "seterrordisplay",
        payload: {
          message: "Error in uploading the file at the moment",
          status: "r"
        }
      });
    }
  };
};

export const setstatus = (status, node, identifier) => {
  return dispatch => {
    try {
      mixpanel.track("Set Active/ Focus");
      var updates = {};
      updates["/" + identifier] = status;
      database.child(node).update(updates);
    } catch (err) {
      dispatch({
        type: "seterrordisplay",
        payload: {
          message: "Cannot complete the action at this time",
          status: "r"
        }
      });
    }
  };
};
