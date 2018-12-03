const reducer = (state = { currentnode: "main" }, action) => {
  if (action.type === "changenode") {
    if (state.currentnode === "main") {
      return { ...state, currentnode: "main/one" };
    } else {
      return { ...state, currentnode: "main" };
    }
  }
  return state;
};

export default reducer;
