import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { DigitText, useDigitToast } from "@cthit/react-digit-components";
import "./styles/Upload.css";
import RecipeForm from "../../../common/elements/recipe-form";
import * as Domain from "../../../common/elements/Domain.jsx";

const cookies = new Cookies();

const domain = Domain.getDomain();

const handleUpload = (data, queueToast) => {
  let creator = "schan";
  let recipeData = {
    ...data,
    creator: creator
  };
  let domain = domain();

  axios
    .post(domain + ":4000/insertRecipe", recipeData)
    .then(() => {
      queueToast({
        text: "Uploaded!"
      });
    })
    .catch(err => {
      queueToast({
        text: "Something went wrong when uploading recipe"
      });
      console.log(err);
    });
};

const Upload = ({}) => {
  const [queueToast] = useDigitToast();

  let user = cookies.get("auth_cookie");
  if (typeof user === "undefined" || user == "") {
    window.location.replace("/login");
  }

  return (
    <div className="uploadBody">
      <div className="uploadTitle">
        <DigitText.Heading3 text={"Upload"}></DigitText.Heading3>
      </div>
      <div className="uploadForm">
        <RecipeForm
          onSubmit={(values, actions) => {
            handleUpload(values, queueToast);
          }}
          submitText="Create recipe"
        />
      </div>
    </div>
  );
};

export default Upload;
