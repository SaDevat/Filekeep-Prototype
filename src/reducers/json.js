const reducer = (state = null, action) => {
  if (action.type === "jsonsyncauto") {
    return action.payload;
  }
  return state;
};

export default reducer;
