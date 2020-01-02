import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Route } from "react-router";

import Home from "./Home.jsx";
import UploadYup from "./elements/upload/UploadYup.container";
import Recipe from "./Recipe";
import Edit from "./Edit";
import NotFound from "./NotFound";

class Router extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/upload" component={UploadYup} />
        <Route path="/recipe" component={Recipe} />
        <Route path="/edit" component={Edit} />
        <Route path="/" component={NotFound} />
      </Switch>
    );
  }
}

export default Router;
