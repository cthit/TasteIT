import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as yup from "yup";
import {
  DigitText,
  DigitTextField,
  DigitTextArea,
  DigitForm,
  DigitFormField,
  DigitDesign,
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
          <div className="uploadForm">
            <DigitForm
              onSubmit={(values, actions) => {
                console.log(values);
              }}
              initialValues={{
                recipeName: "",
                recipeTime: "",
                recipeServings: "",
                recipeDescription: "",
                recipeInstructions: ""
              }}
              validationSchema={yup.object().shape({
                recipeName: yup.string().required("This can't be empty"),
                recipeTime: yup.string().required("This can't be empty"),
                recipeServings: yup.string().required("This can't be empty"),
                recipeDescription: yup.string().required("This can't be empty"),
                recipeInstructions: yup.string().required("This can't be empty")
              })}
              render={({ errors }) => (
                <DigitDesign.Card abswidth="460px">
                  <DigitDesign.CardBody>
                    <DigitFormField
                      name="recipeName"
                      component={DigitTextField}
                      componentProps={{
                        upperLabel: "Name of the recipe",
                        filled: true
                      }}
                    />
                    <DigitFormField
                      name="recipeTime"
                      component={DigitTextField}
                      componentProps={{
                        upperLabel: "Cooking time",
                        filled: true
                      }}
                    />
                    <DigitFormField
                      name="recipeServings"
                      component={DigitTextField}
                      componentProps={{
                        upperLabel: "Servings yielded",
                        filled: true
                      }}
                    />
                    <DigitFormField
                      name="recipeDescription"
                      component={DigitTextArea}
                      componentProps={{
                        upperLabel: "What is this recipe?",
                        filled: true
                      }}
                    />
                    <DigitFormField
                      name="recipeInstructions"
                      component={DigitTextArea}
                      componentProps={{
                        upperLabel: "How do you cook this?",
                        filled: true
                      }}
                    />
                    <DigitDesign.CardButtons>
                      <DigitButton primary raised submit text="Upload Recipe" />
                    </DigitDesign.CardButtons>
                  </DigitDesign.CardBody>
                </DigitDesign.Card>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UploadYup;
