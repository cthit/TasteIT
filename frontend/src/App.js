import React, { Component } from "react";
import { BrowserRouter, Link, Switch } from "react-router-dom";
import { Route } from "react-router";
import {
  DigitDialog,
  DigitProviders,
  DigitHeader,
  DigitNavLink,
  DigitToast,
  DigitText
} from "@cthit/react-digit-components";
import Cookies from "universal-cookie";
import Router from "./components/Router";
import NotFound from "./components/NotFound";
import "./App.css";

const cookies = new Cookies();
var linkText = "";

class App extends Component {
  isUserTrue = () => {
    let user = cookies.get("auth_cookie");
    if (typeof user === "undefined" || user == "") {
      return "Log In";
    } else {
      return "Log Out";
    }
  };

  render() {
    return (
      <DigitProviders>
        <React.Fragment>
          <DigitToast />
          <DigitHeader
            title="TasteIT"
            renderDrawer={closeDrawer => (
              <div className="headerNavLinks">
                <DigitNavLink
                  text={this.isUserTrue()}
                  link="/login"
                  onClick={closeDrawer}
                />
                <DigitNavLink
                  text="View Recipe"
                  link="/"
                  onClick={closeDrawer}
                />
                <DigitNavLink
                  text="Upload recipe"
                  link="/upload"
                  onClick={closeDrawer}
                />
              </div>
            )}
            renderMain={() => <Router />}
          />
        </React.Fragment>
      </DigitProviders>
    );
  }
}

export default App;
