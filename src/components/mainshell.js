import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../actions";

import Focus from "./focusedcompartment";

class MainShell extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.changenode}>Change Node </button>
        <p>Current Node: {this.props.main.currentnode} </p>
        <Focus node={this.props.main.currentnode} />
      </div>
    );
  }
}

const map = state => {
  return {
    json: state.json,
    main: state.main
  };
};

export default connect(
  map,
  actions
)(MainShell);
