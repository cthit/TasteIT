import React, { Component } from "react";
import { Switch } from "react-router-dom";
import { Route } from "react-router";

import Home from "./Home.jsx";
import Upload from "./elements/upload/Upload";
import Recipe from "./Recipe.jsx";
import Edit from "./Edit";
import Callback from "./Callback.jsx";
import Login from "../common/elements/Login.jsx";
import NotFound from "./NotFound";

class Router extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/upload" component={Upload} />
        <Route path="/recipe/:id" component={Recipe} />
        <Route path="/edit/:id" component={Edit} />
        <Route path="/callback" component={Callback} />
        <Route path="/login" component={Login} />
        <Route path="/" component={NotFound} />
      </Switch>
    );
  }
}

export default Router;
