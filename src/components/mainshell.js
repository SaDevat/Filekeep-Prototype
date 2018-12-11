import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../actions";

import Focus from "./focusedcompartment";
import Auth from "./auth";
import Dash from "./dashboard";

class MainShell extends Component {
  render() {
    let content = <Auth />;
    if (this.props.main.id && this.props.main.id !== "null") {
      content = (
        <Dash
          signout={this.props.signout}
          createnewproject={this.props.createnewproject}
          projects={this.props.main.projects}
          chooseproject={this.props.chooseproject}
          uid={this.props.main.id}
          shareproject={this.props.shareproject}
          id={this.props.main.id}
          syncprojects={this.props.syncprojects}
        />
      );
      if (this.props.main.projectselected) {
        content = <Focus node={this.props.main.currentnode} />;
      }
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
