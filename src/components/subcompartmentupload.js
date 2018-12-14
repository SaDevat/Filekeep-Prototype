import React, { Component } from "react";

import "./css/uploadcompartment.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faTimes,
  faFolderPlus
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faPlus);
library.add(faTimes);
library.add(faFolderPlus);

class Subcompartment extends Component {
  state = {
    opened: false
  };

  render() {
    var { uploadnewtostr, node, writenewtodb, type } = this.props;

    let button = (
      <button
        onClick={() => this.setState({ opened: !this.state.opened })}
        id="openaddnewbutton"
      >
        {this.state.opened ? (
          <FontAwesomeIcon icon="times" />
        ) : (
          <FontAwesomeIcon icon="plus" />
        )}
      </button>
    );

    let content = (
      <div id="addnewcontentbox" className="row">
        <input
          type="text"
          onKeyPress={e => writenewtodb(node, type, e)}
          placeholder="Add new compartment name"
          className="col-10"
        />
        {type === "task" && (
          <div className="col-2">
            <label id="addattachmentbutton">
              <input
                type="file"
                onChange={e => uploadnewtostr(node, e)}
                className="hide"
              />
              <div>
                <FontAwesomeIcon icon="folder-plus" />
              </div>
            </label>
          </div>
        )}
        <div className="col-12 subtext text-light">
          press enter after typing
        </div>
      </div>
    );

    let render = button;
    if (this.state.opened) {
      render = (
        <div className="text-center">
          {content}
          {button}
        </div>
      );
    }

    return <div id="outerdivforuploadcomp">{render}</div>;
  }
}

export default Subcompartment;
