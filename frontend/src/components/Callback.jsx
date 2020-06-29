import React, { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Callback extends Component {
  constructor(props) {
    super(props);
    let domain = this.getDomain();
    let params = new URLSearchParams(props.location.search);
    cookies.set("auth_cookie", params.get("token"), { path: "/" });
    window.location.replace(domain + ":3000/");
  }

  getDomain = () => {
    if (process.env.NODE_ENV == "development") {
      return "http://localhost";
    } else {
      return "https://tasteit";
    }
  };

  render() {
    return (
      <div>
        <p>"H"</p>
      </div>
    );
  }
}

export default Callback;
