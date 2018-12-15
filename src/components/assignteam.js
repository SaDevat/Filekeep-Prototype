import React, { Component } from "react";

import "./css/assign.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faPlus);
library.add(faTimes);

class Assign extends Component {
  state = {
    opened: false
  };

  render() {
    var { team, assignuser, node, currentusers, big } = this.props;

    if (!team) {
      return <span />;
    }
    let activeuser = [];
    let user = [];

    Object.keys(team).map(id => {
      var classname = "teamatetoken ";
      var action = "add";
      if (Object.keys(currentusers).indexOf(id) !== -1) {
        if (big) {
          classname += "teamatetokenblue";
        } else {
          classname += "teamatetokendark";
        }
        action = "delete";
      }
      if (!big) {
        classname += " shrinkteamatetoken";
      }
      let el = (
        <button
          key={id}
          className={classname}
          onClick={() => assignuser(id, team[id], node, action)}
        >
          {team[id]}
        </button>
      );

      if (action === "add") {
        user.push(el);
      } else {
        activeuser.push(el);
      }

      return null;
    });

    let bodyuser = (
      <div className="usershell">
        {activeuser.map(el => {
          return el;
        })}
        {this.state.opened &&
          user.map(el => {
            return el;
          })}
        <button
          className={big ? "teamatetoken" : "teamatetoken shrinkteamatetoken"}
          onClick={() => this.setState({ opened: !this.state.opened })}
        >
          {!this.state.opened && activeuser.length === 0 ? (
            "assign teammates"
          ) : this.state.opened ? (
            <FontAwesomeIcon icon="times" />
          ) : (
            <FontAwesomeIcon icon="plus" />
          )}
        </button>
      </div>
    );

    return <div>{bodyuser}</div>;
  }
}

export default Assign;
