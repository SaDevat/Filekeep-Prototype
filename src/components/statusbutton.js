import React from "react";

import "./css/statusbuttons.css";

const StatusButton = props => {
  var { setstatus, active, focus, node } = props;
  return (
    <div className={"d-inline-block " + props.className}>
      <button
        onClick={() => setstatus(!active, node, "active")}
        className="d-inline-block mybutton"
      >
        {!active ? (
          <i className="fas fa-check-double" />
        ) : (
          <i className="fas fa-check" />
        )}
      </button>

      <button
        onClick={() => setstatus(!focus, node, "focus")}
        className="d-inline-block mybutton"
      >
        <i className="fas fa-thumbtack" />
      </button>
    </div>
  );
};

export default StatusButton;
