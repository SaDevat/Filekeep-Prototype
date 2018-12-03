import React, { Component } from "react";

import TestComponent from "./components/testcomponent";
import Header from "./components/header";
import MainShell from "./components/mainshell";

import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={Header} />
          <Route path="/" exact component={MainShell} />
          <Route path="/firebase-test" exact component={TestComponent} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
