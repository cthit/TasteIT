import React, { Component } from "react";
import Cookie from "universal-cookie";
import axios from "axios";

const cookies = new Cookie();

class Login extends Component {
  constructor(props) {
    super(props);
    let domain = this.getDomain();
    let user = cookies.get("auth_cookie");
    if (typeof user == "undefined" || user == "") {
      axios
        .get(domain + ":4000/getClientId")
        .then(res => {
          window.location.replace(
            "https://ldap-auth.chalmers.it/authenticate?client_id=" + res.data
          );
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      cookies.set("auth_cookie", "", { path: "/" });
      window.location.replace(domain + ":3000/");
    }
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
        <p> p </p>
      </div>
    );
  }
}

export default Login;
