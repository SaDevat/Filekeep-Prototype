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
    database.child(oldnode).off();
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
      console.log(node);
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
