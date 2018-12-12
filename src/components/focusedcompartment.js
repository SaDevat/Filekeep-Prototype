import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../actions";

import "./css/focusedcomp.css";

import Subcompartmentupload from "./subcompartmentupload";
import FilesAttachment from "./filesattachment";
import Subcompartment from "./subcompartment";
import StatusButton from "./statusbutton";
import MasonryLayout from "./masonry";

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
    if (!json.hasOwnProperty("title")) {
      return (
        <div>
          <button
            onClick={this.props.signout}
            style={{ display: "block" }}
            className="btn btn-primary"
          >
            Signout
          </button>
          <span>Loading..</span>
          <br />
          <span>Signout if it is taking too long to Load</span>
        </div>
      );
    }

    let node = this.props.node;

    let nodepath = node.split("/");

    let backbutton = <span />;
    let signoutbutton = <span />;
    let backtodash = <span />;
    //set backbutton to a button if node != main
    if (nodepath.length > 3) {
      backbutton = (
        <div>
          <button
            id="backbutton"
            onClick={() =>
              changenode(
                node
                  .split("/")
                  .slice(0, -2)
                  .join("/")
              )
            }
          >
            Back
          </button>

          <StatusButton
            active={json.active}
            focus={json.focus}
            node={node}
            setstatus={setstatus}
          />
        </div>
      );
    }
    if (nodepath.length === 3) {
      signoutbutton = (
        <button className="backbutton changered" onClick={this.props.signout}>
          Signout
        </button>
      );
      backtodash = (
        <button
          className="backbutton"
          onClick={() => this.props.chooseproject(null)}
        >
          Back to Dashboard
        </button>
      );
    }

    nodepath.shift();
    nodepath.shift();
    nodepath.shift();

    for (var i in nodepath) {
      json = json[nodepath[i]];
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

        return null;
      });

    let normaltasks = [];
    let focusedtasks = [];
    let activetasks = [];
    json.hasOwnProperty("children") &&
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

        return null;
      });

    let subuploadcomp = (
      <Subcompartmentupload
        key="thisisupload"
        writenewtodb={writenewtodb}
        uploadnewtostr={uploadnewtostr}
        node={node}
        big={true}
      />
    );

    let render = [
      ...focusedtasks,
      ...activetasks,
      ...files,
      ...normaltasks,
      subuploadcomp
    ];

    return (
      <div>
        <h1>
          {json.title} {backbutton} {signoutbutton} {backtodash}
        </h1>
        <hr className="mt-1" />
        <div className="mt-1" />
        <MasonryLayout columns={3} gap={10} render={render} />
      </div>
    );
  }

  //Sync json from server at start
  componentDidMount() {
    this.props.syncjsonauto(this.props.node);
  }

  //sync json from server when we shift focus
  // componentWillReceiveProps(newprop) {
  //   if (newprop.node !== this.props.node) {
  //     this.props.shiftjsonfocus(newprop.node);
  //   }
  // }

  //rendermyshit function renders the entire dom
  render() {
    return (
      <div className="container mt-5">
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
