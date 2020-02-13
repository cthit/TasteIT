import React, { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Callback extends Component {
  constructor(props) {
    super(props);
    let params = new URLSearchParams(props.location.search);
    cookies.set("auth_cookie", params.get("token"), { path: "/" });
    console.log(cookies.get("auth_cookie"));
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <p>"H"</p>
      </div>
    );
  }
}

export default Callback;
