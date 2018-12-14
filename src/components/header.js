import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../actions";

import Dash from "./dashboard";

import "./css/header.css";

// import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    let signoutbtn = <span />;

    let collapsabledash = (
      <div className="collapse" id="navbarToggleExternalContent">
        <div className="bg-dark p-4">
          <div className="container">
            <h5 className="text-white h4">Projects</h5>
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
          </div>
        </div>
      </div>
    );

    let collapsablebutton = (
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggleExternalContent"
        aria-controls="navbarToggleExternalContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
    );

    if (this.props.main.id !== "null" && this.props.main.id !== null) {
      signoutbtn = (
        <li className="nav-item">
          <span className="nav-link disabled d-inline-block">
            {this.props.main.name ? this.props.main.name : "User"}
          </span>
          <span
            className="nav-link ml-3 d-inline-block"
            onClick={this.props.signout}
            style={{ cursor: "pointer" }}
          >
            Signout
          </span>
        </li>
      );

      if (!this.props.main.projectselected) {
        collapsabledash = <span />;
        collapsablebutton = <span />;
      }
    }

    if (this.props.main.id === "null" || this.props.main.id === null) {
      collapsabledash = <span />;
      collapsablebutton = <span />;
    }

    return (
      <div>
        <div className="pos-f-t">
          {collapsabledash}
          <nav className="navbar navbar-light bg-light">
            {collapsablebutton}

            <ul className="nav navbar-nav navbar-logo abs-center-x">
              <li className="nav-item">
                <img id="navbarlogo" src="./logo.png" alt="logo" />
              </li>
            </ul>

            <ul className="nav navbar-nav">{signoutbtn}</ul>
          </nav>
        </div>
      </div>
    );
  }
}

const mapstate = state => {
  return {
    main: state.main
  };
};

export default connect(
  mapstate,
  actions
)(Header);

// <Link to="/">Home</Link>
