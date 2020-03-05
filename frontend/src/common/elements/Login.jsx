import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
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
