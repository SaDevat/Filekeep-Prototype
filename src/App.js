import React, { Component } from "react";

import TestComponent from "./components/testcomponent";
import Header from "./components/header";

import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={Header} />
          <Route path="/firebase-test" exact component={TestComponent} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
