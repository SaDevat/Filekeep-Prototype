import { combineReducers } from "redux";

import testreducer from "./testreducer";
import json from "./json";
import mainstate from "./mainstate";

export default combineReducers({
  test: testreducer,
  json: json,
  main: mainstate
});
