import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../actions";

import Focus from "./focusedcompartment";

class MainShell extends Component {
  render() {
    return (
      <Router>
        <Route
          path="/"
          component={() => <Focus node={this.props.main.currentnode} />}
        />
      </Router>
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
