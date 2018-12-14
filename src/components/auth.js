import React from "react";
import { connect } from "react-redux";

import "./css/auth.css";

import * as actions from "../actions";

const Auth = props => {
  return (
    <div>
      <div className="authimg">
        <img
          alt="Sign-in with Google"
          src="./button.png"
          onClick={props.handlegoogleauth}
        />
        <div className="subtext">More options coming soon!</div>
      </div>
      <div className="backgrnd" />
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
