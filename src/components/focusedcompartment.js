import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../actions";

class Focus extends Component {
  makearray(json) {
    const immdivs = Object.keys(json);

    let divarray = [];
    for (let i in immdivs) {
      let array1 = [immdivs[i]];
      let array2 = Object.keys(json[immdivs[i]]);
      if (typeof json[immdivs[i]] === "object") {
        array1.push(array2);
      }
      divarray.push(array1);
    }

    return divarray;
  }

  rendermyshit(json) {
    const displayarray = this.makearray(json);

    let name = this.props.node.split("/");
    name = name[name.length - 1];

    return (
      <div>
        <h1>{name}</h1>
        {displayarray.map(function(maincompartment) {
          return (
            <div
              key={maincompartment[0]}
              style={{
                background: "dodgerblue",
                display: "inline-block",
                padding: "10px",
                width: "200px",
                margin: "20px"
              }}
            >
              <p>{maincompartment[0]}</p>
              {maincompartment[1].map(function(subcompartment) {
                return (
                  <div
                    key={subcompartment}
                    style={{
                      background: "salmon",
                      display: "inline-block",
                      padding: "5px",
                      width: "100px",
                      margin: "5px"
                    }}
                  >
                    <p>{subcompartment}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    this.props.syncjsonauto(this.props.node);
  }

  componentWillReceiveProps(newprop) {
    if (newprop.node !== this.props.node) {
      this.props.syncjsonauto(newprop.node, this.props.node);
    }
  }

  render() {
    return <div>{this.rendermyshit(this.props.json)}</div>;
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
