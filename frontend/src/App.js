import React, { Component } from "react";
import { BrowserRouter, Link, Switch } from "react-router-dom";
import { Route } from "react-router";
import {
    DigitDialog,
    DigitProviders,
    DigitHeader,
    DigitNavLink,
    DigitText
} from "@cthit/react-digit-components";

import Router from "./components/Router";
import NotFound from "./components/NotFound";
import "./App.css";

class App extends Component {
    render() {
        return (
            <DigitProviders>
                <DigitHeader
                    title="TasteIT"
                    renderDrawer={closeDrawer => (
                        <div className="headerNavLinks">
                            <DigitNavLink
                                text="View Recipe"
                                link="/"
                                onClick={closeDrawer}
                            />
                            <DigitNavLink
                                text="Upload recipe"
                                link="upload"
                                onClick={closeDrawer}
                            />
                        </div>
                    )}
                    renderMain={() => <Router />}
                    preloadedState={{
                        loading: true
                    }}
                    defaultLanguage="en"
                />
            </DigitProviders>
        );
    }
}

export default App;
