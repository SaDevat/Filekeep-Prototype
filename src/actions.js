import { database } from "./config/firebase";
import { storage } from "./config/firebase";
import { auth } from "./config/firebase";
import { provider } from "./config/firebase";
import { per } from "./config/firebase";

import mixpanel from "./config/mixpanel";

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

export const createnewproject = (uid, e) => {
  return dispatch => {
    if (e.key === "Enter") {
      mixpanel.track("New Project Created");
      var newpushkey = database.child("projects").push().key;
      var updates = {};
      updates["projects/" + newpushkey + "/Main/title"] = e.target.value;
      updates["projects/" + newpushkey + "/allowedusers/" + uid] = true;
      updates["users/" + uid + "/projects/" + newpushkey] = e.target.value;
      database.update(updates);
      e.target.value = "";
    }
  };
};

export const shareproject = (uid, e) => {
  return async dispatch => {
    if (e.key === "Enter") {
      e.persist();
      try {
        var nameofproj = await database
          .child("projects/" + e.target.value)
          .once("value");
        console.log(nameofproj.val());
      } catch (error) {
        console.log(error);
      }
      if (
        nameofproj.val() &&
        nameofproj.val().Main &&
        nameofproj.val().Main.title &&
        !nameofproj.val().allowedusers.hasOwnProperty(uid)
      ) {
        var updates = {};
        updates["projects/" + e.target.value + "/allowedusers/" + uid] = true;
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
      } else {
        e.target.value = "";
        e.target.placeholder = "Please enter a valid key";
      }
    }
  };
};

export const syncprojects = uid => {
  return dispatch => {
    mixpanel.identify(uid);
    mixpanel.track("App Opened");
    database.child("users/" + uid + "/projects").on("value", function(snap) {
      console.log("syncing projects");
      dispatch({ type: "syncjsonproject", payload: snap.val() });
    });
  };
};

export const chooseproject = id => {
  return dispatch => {
    dispatch({ type: "chooseproject", payload: id });
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
    console.log("syncing with server");
    mixpanel.track("Opened Project");
    database.child(node).on("value", function(snapshot) {
      dispatch({ type: "jsonsyncauto", payload: snapshot.val() });
    });
  };
};

export const changenode = nodename => {
  return dispatch => {
    mixpanel.track("Switched nodes");
    dispatch({ type: "changenode", payload: nodename });
  };
};

export const writenewtodb = (node, e) => {
  return dispatch => {
    if (e.key === "Enter") {
      mixpanel.track("Created new Compartment");
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
  };
};

export const setstatus = (status, node, identifier) => {
  return dispatch => {
    mixpanel.track("Set Active/ Focus");
    var updates = {};
    updates["/" + identifier] = status;
    database.child(node).update(updates);
  };
};
