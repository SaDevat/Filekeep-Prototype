import React from "react";

import "./css/statusbuttons.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faCheckDouble,
  faThumbtack
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faCheck);
library.add(faCheckDouble);
library.add(faThumbtack);

const StatusButton = props => {
  var { setstatus, active, focus, node } = props;
  return (
    <div className={"d-inline-block " + props.className}>
      <button
        onClick={() => setstatus(!active, node, "active")}
        className="d-inline-block mybutton"
      >
        {!active ? (
          <FontAwesomeIcon icon="check-double" />
        ) : (
          <FontAwesomeIcon icon="check" />
        )}
      </button>

      <button
        onClick={() => setstatus(!focus, node, "focus")}
        className="d-inline-block mybutton"
      >
        <FontAwesomeIcon icon="thumbtack" />
      </button>
    </div>
  );
};

export default StatusButton;
