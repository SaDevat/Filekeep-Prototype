import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../actions";

import Focus from "./focusedcompartment";
import Auth from "./auth";
import Dash from "./dashboard";

class MainShell extends Component {
  componentDidMount() {
    this.props.handleoffline();
  }

  render() {
    let content = <Auth />;
    if (this.props.main.id && this.props.main.id !== "null") {
      content = (
        <div className="bg-dark">
          <div className="container">
            <div
              className="text-light text-center"
              style={{ fontSize: "25px" }}
            >
              Projects
            </div>
            <div className="mb-3 text-light subtext">
              Begin by entering a name for your project and hitting enter
            </div>
            <Dash
              createnewproject={this.props.createnewproject}
              projects={this.props.main.projects}
              chooseproject={this.props.chooseproject}
              uid={this.props.main.id}
              shareproject={this.props.shareproject}
              id={this.props.main.id}
              syncprojects={this.props.syncprojects}
              name={this.props.main.name}
            />
          </div>
        </div>
      );
      if (this.props.main.projectselected) {
        content = (
          <Focus
            node={this.props.main.currentnode}
            key={this.props.main.projectselected}
          />
        );
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
