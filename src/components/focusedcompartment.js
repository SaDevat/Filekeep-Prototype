import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../actions";
import uuid from "uuid/v4";

class Focus extends Component {
  rendermyshit(json, changenode) {
    let node = this.props.node;
    let nodepath = node.split("/");

    let backbutton = <span />;
    if (nodepath.length > 1) {
      backbutton = (
        <button onClick={() => changenode(nodepath.slice(0, -2).join("/"))}>
          Back
        </button>
      );
    }

    return (
      <div>
        <h1>
          {json.title} {backbutton}
        </h1>
        {Object.keys(json.children).map(function(id) {
          return (
            <div
              key={id}
              style={{
                background: "dodgerblue",
                display: "inline-block",
                padding: "10px",
                width: "200px",
                margin: "20px"
              }}
            >
              <button
                onClick={() => changenode(node + "/children/" + id)}
                style={{ display: "block" }}
                disabled={
                  json.children[id].hasOwnProperty("children") ? false : true
                }
              >
                {json.children[id].title}
              </button>
              {json.children[id].hasOwnProperty("children") &&
                Object.keys(json.children[id].children).map(function(subid) {
                  return (
                    <div
                      key={subid}
                      style={{
                        background: "salmon",
                        display: "inline-block",
                        padding: "5px",
                        width: "100px",
                        margin: "5px"
                      }}
                    >
                      <p>{json.children[id].children[subid].title}</p>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    this.props.syncjsonauto(this.props.node, this.props.node);
  }

  componentWillReceiveProps(newprop) {
    if (newprop.node !== this.props.node) {
      this.props.syncjsonauto(newprop.node, this.props.node);
    }
  }

  render() {
    return (
      <div>
        {this.props.json &&
          this.rendermyshit(this.props.json, this.props.changenode)}
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
)(Focus);
