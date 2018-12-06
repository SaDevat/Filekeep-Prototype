import React from "react";

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
    color = "#D2691E";
  }

  return (
    <div
      key={subid}
      style={{
        background: color,
        display: "inline-block",
        padding: "5px",
        width: "100px",
        margin: "5px"
      }}
    >
      <textarea
        defaultValue={json.children[id].children[subid].title}
        onKeyPress={e =>
          editnameindb(node + "/children/" + id + "/children/" + subid, e)
        }
        onBlur={e =>
          editnameindbf(node + "/children/" + id + "/children/" + subid, e)
        }
        style={{
          width: "95%",
          fontFamily: "inherit",
          overflow: "hidden",
          overflowWrap: "break-word",
          background: "transparent",
          resize: "auto"
        }}
      />
      <StatusButton
        active={json.children[id].children[subid].active}
        focus={json.children[id].children[subid].focus}
        node={node + "/children/" + id + "/children/" + subid}
        setstatus={setstatus}
      />
    </div>
  );
};

export default Subcompartment;
