import React, { Component } from "react";

import { Router, Link } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../actions";

import Subcompartmentupload from "./subcompartmentupload";
import FilesAttachment from "./filesattachment";
import Subcompartment from "./subcompartment";
import StatusButton from "./statusbutton";

class Focus extends Component {
  rendermyshit(
    json,
    changenode,
    writenewtodb,
    uploadnewtostr,
    setstatus,
    editnameindb,
    editnameindbf
  ) {
    let node = this.props.node;
    let nodepath = node.split("/");

    let backbutton = <span />;
    //set backbutton to a button if node != main
    if (nodepath.length > 1) {
      backbutton = (
        <button onClick={() => changenode(nodepath.slice(0, -2).join("/"))}>
          Back
        </button>
      );
    }

    let files = [];
    json.hasOwnProperty("files") &&
      Object.keys(json.files).map(function(fileid) {
        files.push(
          <FilesAttachment
            key={fileid}
            fileid={fileid}
            json={json}
            big={true}
          />
        );
      });

    let normaltasks = [];
    let focusedtasks = [];
    let activetasks = [];
    Object.keys(json.children).map(function(id) {
      var s = (
        <Subcompartment
          key={id}
          id={id}
          changenode={changenode}
          json={json}
          node={node}
          writenewtodb={writenewtodb}
          uploadnewtostr={uploadnewtostr}
          setstatus={setstatus}
          editnameindb={editnameindb}
          editnameindbf={editnameindbf}
        />
      );

      if (json.children[id].focus) {
        focusedtasks.push(s);
      } else if (json.children[id].active) {
        activetasks.push(s);
      } else {
        normaltasks.push(s);
      }
    });

    let render = [...focusedtasks, ...activetasks, ...files, ...normaltasks];

    return (
      <div>
        <h1>
          {json.title} {backbutton}{" "}
          {node !== "Main" && (
            <StatusButton
              active={json.active}
              focus={json.focus}
              node={node}
              setstatus={setstatus}
            />
          )}
        </h1>

        <Subcompartmentupload
          writenewtodb={writenewtodb}
          uploadnewtostr={uploadnewtostr}
          node={node}
          big={true}
        />

        {render.map(function(el) {
          return el;
        })}
      </div>
    );
  }

  //Sync json from server at start
  componentDidMount() {
    this.props.syncjsonauto(this.props.node, this.props.node);
  }

  //sync json from server when we shift focus
  componentWillReceiveProps(newprop) {
    if (newprop.node !== this.props.node) {
      this.props.syncjsonauto(newprop.node, this.props.node);
    }
  }

  //rendermyshit function renders the entire dom
  render() {
    return (
      <div>
        {this.props.json &&
          this.rendermyshit(
            this.props.json,
            this.props.changenode,
            this.props.writenewtodb,
            this.props.uploadnewtostr,
            this.props.setstatus,
            this.props.editnameindb,
            this.props.editnameindbf
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
