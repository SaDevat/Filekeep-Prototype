import React, { Component } from "react";

import "./css/uploadcompartment.css";

class Subcompartment extends Component {
  state = {
    opened: false
  };

  render() {
    var { big, uploadnewtostr, node, writenewtodb } = this.props;

    let button = (
      <button
        onClick={() => this.setState({ opened: !this.state.opened })}
        id="openaddnewbutton"
      >
        {this.state.opened ? (
          <i className="fas fa-times" />
        ) : (
          <i className="fas fa-plus" />
        )}
      </button>
    );

    let content = (
      <div id="addnewcontentbox" className="row">
        <input
          type="text"
          onKeyPress={e => writenewtodb(node, e)}
          placeholder="Add new compartment"
          className="col-10"
        />
        <div className="col-2">
          <label id="addattachmentbutton">
            <input
              type="file"
              onChange={e => uploadnewtostr(node, e)}
              className="hide"
            />
            <div>
              <i className="fas fa-folder-plus" />
            </div>
          </label>
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
