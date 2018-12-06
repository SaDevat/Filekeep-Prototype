import React from "react";
import { connect } from "react-redux";

import * as actions from "../actions";

const Auth = props => {
  return (
    <div>
      <h1>Please Signin to continue</h1>
      <button onClick={props.handlegoogleauth}>Signin With Google</button>
    </div>
  );
};
const mapstate = state => {
  return {
    main: state.main
  };
};

export default connect(
  mapstate,
  actions
)(Auth);
