import React from "react";

import "./css/subsubcompartments.css";

import StatusButton from "./statusbutton";

const Subcompartment = props => {
  var { json, id, subid, setstatus, node, editnameindb, editnameindbf } = props;

  var color;
  if (json.children[id].children[subid].active) {
    color = "salmon";
  } else {
    color = "#43464B";
  }

  if (json.children[id].children[subid].focus) {
    color = "#ffb732";
  }

  return (
    <div className="col-lg-6 col-md-12">
      <div
        key={subid}
        style={{
          background: color
        }}
        id="subsubcompartmentbox"
      >
        <textarea
          defaultValue={json.children[id].children[subid].title}
          onKeyPress={e =>
            editnameindb(node + "/children/" + id + "/children/" + subid, e)
          }
          onBlur={e =>
            editnameindbf(node + "/children/" + id + "/children/" + subid, e)
          }
          id="subsubtextarea"
        />
        <StatusButton
          active={json.children[id].children[subid].active}
          focus={json.children[id].children[subid].focus}
          node={node + "/children/" + id + "/children/" + subid}
          setstatus={setstatus}
          className="ml-0"
        />
      </div>
    </div>
  );
};

export default Subcompartment;
