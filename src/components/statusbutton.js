import React from "react";

const StatusButton = props => {
  var { setstatus, active, focus, node } = props;
  return (
    <div>
      <button
        onClick={() => setstatus(!active, node, "active")}
        style={{ display: "inline-block" }}
      >
        {!active ? "Activate" : "Deactivate"}
      </button>

      <button
        onClick={() => setstatus(!focus, node, "focus")}
        style={{ display: "inline-block" }}
      >
        {!focus ? "Focus" : "Remove Focus"}
      </button>
    </div>
  );
};

export default StatusButton;
