import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../actions";

class Focus extends Component {
  rendermyshit(json, changenode, writenewtodb, uploadnewtostr) {
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
        <div
          style={{
            background: "dodgerblue",
            display: "inline-block",
            padding: "10px",
            width: "200px",
            margin: "20px"
          }}
        >
          <p>Add New:</p>
          <input
            type="text"
            onKeyPress={e => writenewtodb(node, e)}
            style={{ width: "90%" }}
          />
          <hr />
          <p>Add attachment:</p>
          <input type="file" onChange={e => uploadnewtostr(node, e)} />
        </div>

        {json.hasOwnProperty("files") &&
          Object.keys(json.files).map(function(fileid) {
            return (
              <div
                key={fileid}
                style={{
                  width: "200px",
                  height: "200px",
                  background: "lime",
                  display: "inline-block",
                  margin: "20px",
                  verticalAlign: "center"
                }}
              >
                <a
                  href={
                    json.files[fileid].hasOwnProperty("download") &&
                    json.files[fileid].download
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3>{json.files[fileid].name}</h3>
                </a>
                <img
                  src={
                    json.files[fileid].hasOwnProperty("download") &&
                    json.files[fileid].download
                  }
                  alt="Loading..."
                  style={{ width: "100%" }}
                />
              </div>
            );
          })}

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
              <div
                style={{
                  background: "salmon",
                  display: "inline-block",
                  padding: "5px",
                  width: "100px",
                  margin: "5px"
                }}
              >
                <p>Add New:</p>
                <input
                  type="text"
                  onKeyPress={e => writenewtodb(node + "/children/" + id, e)}
                  style={{ width: "90%" }}
                />
              </div>

              {json.children[id].hasOwnProperty("files") &&
                Object.keys(json.children[id].files).map(function(fileid) {
                  return (
                    <div
                      key={fileid}
                      style={{
                        background: "lime",
                        display: "inline-block",
                        padding: "5px",
                        width: "100px",
                        margin: "5px"
                      }}
                    >
                      <a
                        href={
                          json.children[id].files[fileid].hasOwnProperty(
                            "download"
                          ) && json.children[id].files[fileid].download
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {json.children[id].files[fileid].name}
                      </a>
                    </div>
                  );
                })}

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
          this.rendermyshit(
            this.props.json,
            this.props.changenode,
            this.props.writenewtodb,
            this.props.uploadnewtostr
          )}
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
