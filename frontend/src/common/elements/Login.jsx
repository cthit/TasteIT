import React, { Component } from "react";
import Cookie from "universal-cookie";
import axios from "axios";

const cookies = new Cookie();

class Login extends Component {
  constructor(props) {
    super(props);
    let user = cookies.get("auth_cookie");
    if (typeof user == "undefined" || user == "") {
      axios
        .get("http://localhost:4000/getClientId")
        .then(res => {
          window.location.replace(
            "https://ldap-auth.chalmers.it/authenticate?client_id=" + res.data
          );
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log("triggered");
      //cookies.remove("auth-cookie", { path: "/" });
      cookies.set("auth_cookie", "", { path: "/" });
      window.location.replace("http://localhost:3000/");
    }
  }

  render() {
    return (
      <div>
        <p> p </p>
      </div>
    );
  }
}

export default Login;
