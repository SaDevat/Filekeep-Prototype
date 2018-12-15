const reducer = (
  state = {
    currentnode: "projects/" + localStorage.getItem("selectedproj") + "/Main",
    id: localStorage.getItem("id"),
    name: localStorage.getItem("name"),
    projects: null,
    error: false,
    projectselected:
      localStorage.getItem("selectedproj") === "null" ||
      localStorage.getItem("selectedproj") === null
        ? false
        : localStorage.getItem("selectedproj")
  },
  action
) => {
  if (action.type === "changenode") {
    localStorage.setItem("currentnode", action.payload);
    return { ...state, currentnode: action.payload };
  }
  if (action.type === "signin") {
    localStorage.setItem("id", action.payload.uid);
    localStorage.setItem("name", action.payload.displayName);
    return {
      ...state,
      id: action.payload.uid,
      name: action.payload.displayName
    };
  }
  if (action.type === "signout") {
    localStorage.setItem("id", null);
    localStorage.setItem("name", null);
    localStorage.setItem("selectedproj", null);
    return {
      ...state,
      id: null,
      name: "null",
      currentnode: null,
      projectselected: false
    };
  }
  if (action.type === "syncjsonproject") {
    if (action.payload === null) {
      return { ...state, projects: {} };
    }
    return { ...state, projects: action.payload };
  }
  if (action.type === "chooseproject") {
    localStorage.setItem("selectedproj", action.payload);
    if (action.payload === null) {
      return {
        ...state,
        projectselected: false
      };
    }
    return {
      ...state,
      projectselected: action.payload,
      currentnode: "projects/" + action.payload + "/Main"
    };
  }

  if (action.type === "seterrordisplay") {
    return { ...state, error: action.payload };
  }
  if (action.type === "syncteam") {
    console.log(action.payload);
    return { ...state, team: action.payload };
  }
  return state;
};

export default reducer;
