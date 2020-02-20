import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import axios from "axios";
import * as yup from "yup";
import {
  DigitText,
  DigitTextField,
  DigitTextArea,
  DigitForm,
  DigitDesign,
  DigitButton,
  useDigitToast
} from "@cthit/react-digit-components";
import IngredientCreator from "./IngredientCreator";
import "./styles/Upload.css";
import RecipeForm from "../../../common/elements/recipe-form";

const handleUpload = (data, queueToast) => {
  let creator = "schan";
  let recipeData = {
    ...data,
    creator: creator
  };

  axios
    .post("http://localhost:4000/insertRecipe", recipeData)
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

const UploadYup = ({}) => {
  const [queueToast] = useDigitToast();

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

export default UploadYup;
