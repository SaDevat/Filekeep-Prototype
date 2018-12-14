import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../actions";

import "./css/focusedcomp.css";
import "./css/loader.css";

import Subcompartmentupload from "./subcompartmentupload";
import FilesAttachment from "./filesattachment";
import Subcompartment from "./subcompartment";
import MasonryLayout from "./masonry";
import Error from "./errorcomponent";

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
        <div className="abs-center-x text-center">
          <div className="lds-ripple">
            <div />
            <div />
          </div>
          <br />
          <span className="text-muted">
            Signout if it is taking too long to Load
          </span>
        </div>
      );
    }

    let node = this.props.node;

    let nodepath = node.split("/");

    let backbutton = <span />;

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
        </div>
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
    let normalcontainer = [];
    let focusedcontainer = [];
    let activecontainer = [];
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
          if (json.children[id].type === "task") {
            focusedtasks.push(s);
          } else {
            focusedcontainer.push(s);
          }
        } else if (json.children[id].active) {
          if (json.children[id].type === "task") {
            activetasks.push(s);
          } else {
            activecontainer.push(s);
          }
        } else {
          if (json.children[id].type === "task") {
            normaltasks.push(s);
          } else {
            normalcontainer.push(s);
          }
        }

        return null;
      });

    let subuploadcomptask = (
      <Subcompartmentupload
        key="thisisupload"
        type="task"
        writenewtodb={writenewtodb}
        uploadnewtostr={uploadnewtostr}
        node={node}
        big={true}
      />
    );
    let subuploadcompcont = (
      <Subcompartmentupload
        key="thisisupload"
        type="container"
        writenewtodb={writenewtodb}
        uploadnewtostr={uploadnewtostr}
        node={node}
        big={true}
      />
    );

    let rendertask = [
      subuploadcomptask,
      ...focusedtasks.reverse(),
      ...activetasks.reverse(),
      ...files.reverse(),
      ...normaltasks.reverse()
    ];

    let rendercontainer = [
      ...focusedcontainer.reverse(),
      ...activecontainer.reverse(),
      ...normalcontainer.reverse(),
      subuploadcompcont
    ];

    return (
      <div>
        {this.props.main.error !== false && (
          <Error
            status={this.props.main.error.status}
            message={this.props.main.error.message}
            error={this.props.main.error.error}
            persist={this.props.main.error.persist}
            seterrordisplay={this.props.seterrordisplay}
          />
        )}
        <h1>
          {json.title} {backbutton}
        </h1>
        {!json.hasOwnProperty("children") && (
          <div className="subtext text-left" style={{ fontSize: "20px" }}>
            Click the plus button and type a name for a new division. Press
            enter after typing to create it.
          </div>
        )}
        <hr className="mt-1" />
        <div className="mt-1" />
        <div className="container horizscroll">
          <div className="row text-center">
            {rendercontainer.map(el => {
              return <div className="col-4 text-left">{el}</div>;
            })}
          </div>
        </div>
        <hr />
        <MasonryLayout
          columns={this.state.columns}
          gap={10}
          render={rendertask}
        />
      </div>
    );
  }

  state = {
    columns: 3
  };

  //Sync json from server at start
  componentDidMount() {
    this.props.syncjsonauto(this.props.node);
    window.addEventListener("resize", () => this.updatecolumns(this));
    this.updatecolumns(this);
  }

  componentWillUnmount() {
    this.props.unsyncjson(this.props.node);
    window.removeEventListener("resize", () => this.updatecolumns(this));
  }

  updatecolumns($this) {
    if (window.innerWidth > 767) {
      $this.setState({ columns: 3 });
    }
    if (window.innerWidth < 768 && window.innerWidth > 499) {
      $this.setState({ columns: 2 });
    } else if (window.innerWidth < 500) {
      $this.setState({ columns: 1 });
    }
  }

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
