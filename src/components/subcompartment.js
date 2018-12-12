import React from "react";

import "./css/subcompartments.css";

import Subsubcompartment from "./subsubcompartment";
import Subcompartmentupload from "./subcompartmentupload";
import FilesAttachment from "./filesattachment";
import StatusButton from "./statusbutton";

const Subcompartment = props => {
  var {
    id,
    changenode,
    json,
    node,
    writenewtodb,
    uploadnewtostr,
    setstatus,
    editnameindb,
    editnameindbf
  } = props;

  var color;
  if (json.children[id].active) {
    color = "dodgerblue";
  } else {
    color = "grey";
  }

  if (json.children[id].focus) {
    color = "#FFA500";
  }

  let uploadcomp = (
    <Subcompartmentupload
      uploadnewtostr={uploadnewtostr}
      writenewtodb={writenewtodb}
      node={node + "/children/" + id}
    />
  );

  let header = (
    <div className="mb-2">
      <button
        onClick={() => changenode(node + "/children/" + id)}
        style={{ display: "inline-block" }}
        id="headline"
        disabled={json.children[id].hasOwnProperty("children") ? false : true}
      >
        {json.children[id].title}{" "}
        {json.children[id].hasOwnProperty("children") && (
          <i className="fas fa-arrow-right" />
        )}
      </button>

      <StatusButton
        active={json.children[id].active}
        focus={json.children[id].focus}
        node={node + "/children/" + id}
        setstatus={setstatus}
        className="ml-2"
      />
    </div>
  );

  let files = [];
  json.children[id].hasOwnProperty("files") &&
    Object.keys(json.children[id].files).map(function(fileid) {
      let f = (
        <FilesAttachment
          key={fileid}
          json={json.children[id]}
          fileid={fileid}
          big={false}
        />
      );
      files.push(f);
      return null;
    });

  let tasks = [];
  var focusedtasks = [];
  let activetasks = [];
  json.children[id].hasOwnProperty("children") &&
    Object.keys(json.children[id].children).map(function(subid) {
      var subsubcom = (
        <Subsubcompartment
          key={subid}
          subid={subid}
          json={json}
          id={id}
          setstatus={setstatus}
          node={node}
          editnameindb={editnameindb}
          editnameindbf={editnameindbf}
        />
      );
      if (json.children[id].children[subid].focus) {
        focusedtasks.push(subsubcom);
      } else if (json.children[id].children[subid].active) {
        activetasks.push(subsubcom);
      } else {
        tasks.push(subsubcom);
      }

      return null;
    });

  let render = [...focusedtasks, ...activetasks, ...files, ...tasks];

  return (
    <div
      key={id}
      style={{
        background: color,
        display: "inline-block",
        padding: "10px",
        width: "95%",
        borderRadius: "3px"
      }}
    >
      {header}
      <div className="row" id="subsubrenderbox">
        {render.map(function(el) {
          return el;
        })}
      </div>
      {uploadcomp}
    </div>
  );
};

export default Subcompartment;
