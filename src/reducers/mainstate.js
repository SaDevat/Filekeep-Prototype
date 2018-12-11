const reducer = (
  state = {
    currentnode: "projects/" + localStorage.getItem("selectedproj") + "/Main",
    id: localStorage.getItem("id"),
    projects: null,
    projectselected:
      localStorage.getItem("selectedproj") === "null" ||
      localStorage.getItem("selectedproj") === null
        ? false
        : true
  },
  action
) => {
  if (action.type === "changenode") {
    return { ...state, currentnode: action.payload };
  }
  if (action.type === "signin") {
    localStorage.setItem("id", action.payload.uid);
    return {
      ...state,
      id: action.payload.uid
    };
  }
  if (action.type === "signout") {
    localStorage.setItem("id", null);
    localStorage.setItem("selectedproj", null);
    return {
      ...state,
      id: null,
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
      projectselected: true,
      currentnode: "projects/" + action.payload + "/Main"
    };
  }
  return state;
};

export default reducer;
