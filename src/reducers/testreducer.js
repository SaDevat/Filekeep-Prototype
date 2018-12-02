const reducer = (state = { msg: "No Current Message", files: [] }, action) => {
  if (action.type === "testfire") {
    console.log("Test Fired");
    return state;
  }

  if (action.type === "testupload") {
    console.log("Uploading test file to /test folder");
    var filesarray;
    if (state.files) {
      filesarray = [...state.files];
    } else {
      filesarray = [];
    }
    filesarray.push(action.payload);

    return { ...state, files: filesarray };
  }

  if (action.type === "testuploaderror") {
    console.log("Something Went Wrong");
  }

  if (action.type === "testwrite") {
    console.log("Writing to the server");
    return { ...state, msg: action.payload };
  }

  if (action.type === "testsync") {
    return { ...state, msg: action.payload };
  }

  return state;
};

export default reducer;
