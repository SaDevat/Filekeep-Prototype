import { combineReducers } from "redux";

import json from "./json";
import mainstate from "./mainstate";

export default combineReducers({
  json: json,
  main: mainstate
});
