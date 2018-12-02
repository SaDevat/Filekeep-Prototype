import React, { Component } from "react";
import * as actions from "../actions";
import { connect } from "react-redux";

import { database } from "../config/firebase";

class TestComponent extends Component {
  //name functions and component lifecycle hooks here
  async componentDidMount() {
    var msg = await database
      .child("test")
      .child("msg")
      .once("value");
    if (this.props.test.msg === "No Current Message") {
      console.log("synced with server");
      this.props.testsync(msg.node_.value_);
    }
  }
  render() {
    //logic here

    return (
      <div>
        <h1>FireBase Testing Component</h1>
        <br />
        <p> Test the redux Linkage </p>
        <button onClick={this.props.testfire}> Test Fire here! </button>
        <br />
        <hr />
        <p>Upload a File: </p>
        <input onChange={this.props.testupload} type="file" />
        <br />
        <hr />
        <p>Write a Text Message: </p>
        <input onChange={this.props.testwrite} />
        <hr />
        <br />
        <p>
          Files uploaded recently:
          <strong>{this.props.test.files.join()} </strong>
        </p>
        <p>
          Current message on the server :<strong> {this.props.test.msg}</strong>
        </p>
      </div>
    );
  }
}

const mapstate = state => {
  return {
    test: state.test
  };
};

export default connect(
  mapstate,
  actions
)(TestComponent);
