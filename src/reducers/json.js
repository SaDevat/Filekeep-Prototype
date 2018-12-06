const reducer = (state = {}, action) => {
  if (action.type === "jsonsyncauto") {
    return action.payload;
  }

  return state;
};

export default reducer;
