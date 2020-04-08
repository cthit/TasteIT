import axios from "axios";
import Cookies from "universal-cookie";
import * as Domain from "./Domain.jsx";

const cookies = new Cookies();

const isUserActive = () => {
  let user = cookies.get("auth_cookie");
  if (typeof user === "undefined" || user == "") {
    return false;
  } else {
    return true;
  }
};

export const getCurrentUser = () => {
  let domain = Domain.getDomain();
  if (isUserActive()) {
    let userData = { token: cookies.get("auth_cookie") };
    axios
      .post(domain + ":4000/verifyToken", userData)
      .then(res => {
        let response = res.data;
        return response.body.cid;
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    return null;
  }
};

export default getCurrentUser;
