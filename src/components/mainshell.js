import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../actions";

import Focus from "./focusedcompartment";
import Auth from "./auth";

class MainShell extends Component {
  render() {
    let content = <Auth />;
    if (this.props.main.id) {
      content = <Focus node={this.props.main.currentnode} />;
    }
    return <div>{content}</div>;
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
