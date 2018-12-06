const reducer = (
  state = {
    currentnode: localStorage.getItem("id") + "/Main",
    id: localStorage.getItem("id")
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
      id: action.payload.uid,
      currentnode: action.payload.uid + "/Main"
    };
  }
  if (action.type === "signout") {
    localStorage.setItem("id", null);
    return { ...state, id: null, currentnode: null };
  }
  return state;
};

export default reducer;
