import React, { Component } from "react";

import "./css/dash.css";
import "./css/loader.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faArrowRight);

class Dash extends Component {
  componentDidMount() {
    if (
      this.props.id &&
      this.props.id !== "null" &&
      this.props.projects === null
    ) {
      this.props.syncprojects(this.props.id);
    }
  }
  render() {
    if (this.props.projects === null || this.props.projects === "null") {
      return (
        <div className="lds-ripple">
          <div />
          <div />
        </div>
      );
    }

    var {
      createnewproject,
      projects,
      chooseproject,
      uid,
      name,
      shareproject
    } = this.props;
    return (
      <div>
        <div className="pt-1 row">
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="createnewbox">
              <input
                onKeyPress={e => createnewproject(uid, name, e)}
                type="text"
                style={{ width: "90%", display: "block" }}
                placeholder="Add a new Project Name"
                className="myinput"
              />
              <div className="myor">or</div>
              <input
                onKeyPress={e => shareproject(uid, name, e)}
                type="text"
                style={{ width: "90%", display: "block" }}
                placeholder="Add existing project key"
                className="myinput"
              />
              <div className="subtext">Press enter after typing</div>
            </div>
          </div>

          {projects &&
            Object.keys(projects).map(function(id) {
              return (
                <div key={id} className="col-lg-3 col-md-4 col-sm-6">
                  <div className="createnewbox">
                    <button
                      onClick={() => chooseproject(id)}
                      className="headline"
                    >
                      {projects[id]}{" "}
                      <FontAwesomeIcon
                        icon="arrow-right"
                        className="smallarrowicon mr-1"
                      />
                    </button>

                    <div className="smallfont">
                      share this id with teammates to work together:
                      <strong className="d-block">"{id}"</strong>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Dash;
