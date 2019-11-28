import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as yup from "yup";
import {
  DigitText,
  DigitForm,
  DigitFormField,
  DigitFormFieldArray,
  DigitDesign,
  DigitTextField,
  DigitButton
} from "@cthit/react-digit-components";
import "./styles/Upload.css";

class UploadYup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: props.recipeName,
      recipeTime: props.recipeTime,
      recipeServings: props.recipeServings,
      recipeIngredients: props.recipeIngredients,
      recipeDescription: props.recipeDescription,
      recipeInstructions: props.recipeInstructions,
      currentIngredient: props.currentIngredient,
      currentAmount: props.currentAmount,
      currentMeassurement: props.currentMeassurement,
      editMode: props.editMode,
      noName: false
    };
  }

  modeText = () => {
    if (this.state.editMode) {
      return "Edit Recipe";
    } else {
      return "Upload Recipe";
    }
  };

  changeRecipeName = name => {
    this.setState({
      recipeName: name
    });
  };

  render() {
    let yup = require("yup");
    return (
      <div className="uploadBody">
        <div className="uploadTitle">
          <DigitText.Heading3 text={"Upload"}></DigitText.Heading3>
          <DigitForm
            onSubmit={values => {
              console.log(values);
            }}
            initialValues={{
              recipeName: this.state.recipeName,
              recipeTime: "",
              recipeServings: "",
              recipeIngredients: "",
              recipeDescription: "",
              recipeInstructions: "",
              currentIngredient: "",
              currentAmount: "",
              currentMeassurement: ""
            }}
            validationSchema={yup.object().shape({
              recipeName: yup.string().required("This is a required field")
            })}
            render={({ errors }) => (
              <DigitDesign.Card absWidth="400px">
                <DigitDesign.CardBody>
                  <DigitFormField
                    name="recipeName"
                    component={DigitTextField}
                    componentProps={{
                      upperLabel: "Name of the recipe",
                      lowerLabel: "Required"
                    }}
                  />
                  <DigitButton text={this.modeText()} submit primary outlined />
                </DigitDesign.CardBody>
              </DigitDesign.Card>
            )}
          />
        </div>
      </div>
    );
  }
}

export default UploadYup;
