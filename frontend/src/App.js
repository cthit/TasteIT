import React, { Component } from "react";
import {
  DigitProviders,
  DigitButton,
  DigitHeader,
  DigitHeaderDrawer,
  DigitLayout,
  DigitNavLink,
  DigitToast
} from "@cthit/react-digit-components";
import Cookies from "universal-cookie";
import Router from "./components/Router";
import "./App.css";

const cookies = new Cookies();

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
          <DigitHeaderDrawer
            title="TasteIT"
            headerRowProps={{ flex: "1", justifyContent: "space-between" }}
            renderHeader={() => (
              <DigitLayout.Row>
                <DigitButton
                  text={this.isUserTrue()}
                  outlined
                  onClick={() =>
                    window.location.replace("http://localhost:3000/login")
                  }
                />
              </DigitLayout.Row>
            )}
            renderDrawer={() => (
              <React.Fragment>
                <DigitNavLink text="View Recipes" link="/" />
                <DigitNavLink text="Upload Recipe" link="/upload" />
              </React.Fragment>
            )}
            renderMain={() => <Router />}
          />
        </React.Fragment>
      </DigitProviders>
    );
  }
}

export default App;
