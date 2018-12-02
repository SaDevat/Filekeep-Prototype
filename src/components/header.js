import React, { Component } from "react";

import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div>
        <h1>FileKeep</h1>
        <Link to="/">Home</Link>
        <span> | </span>
        <Link to="/firebase-test">Firebase Test</Link>
      </div>
    );
  }
}

export default Header;
