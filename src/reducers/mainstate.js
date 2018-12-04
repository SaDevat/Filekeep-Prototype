const reducer = (state = { currentnode: "Main" }, action) => {
  if (action.type === "changenode") {
    return { ...state, currentnode: action.payload };
  }
  return state;
};

export default reducer;
