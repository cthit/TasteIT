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
  DigitFormField,
  DigitDesign,
  DigitButton
} from "@cthit/react-digit-components";
import IngredientCreator from "./IngredientCreator";
import "./styles/Upload.css";

class UploadYup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeIngredients: [],
      currentIngredient: "",
      currentAmount: "",
      currentMeassurement: "g"
    };
  }

  changeIngredient = ingredient => {
    this.setState({
      currentIngredient: ingredient
    });
  };

  changeAmount = amount => {
    this.setState({
      currentAmount: amount
    });
  };

  changeMeassurement = meassurement => {
    this.setState({
      currentMeassurement: meassurement
    });
  };

  handleAdd = () => {
    let newRecipeIngredients = this.state.recipeIngredients;
    newRecipeIngredients.push([
      this.state.currentIngredient,
      this.state.currentAmount,
      this.state.currentMeassurement
    ]);

    this.setState({
      recipeIngredients: newRecipeIngredients
    });
  };

  handleDelete = ingredientWithAmount => {
    let newRecipeIngredients = this.state.recipeIngredients;
    let index = newRecipeIngredients.indexOf(ingredientWithAmount);
    if (index !== -1) {
      newRecipeIngredients.splice(index, 1);
      this.setState({
        recipeIngredents: newRecipeIngredients
      });
    }
  };

  handleUpload = data => {
    let ingredients = this.state.recipeIngredients;
    if (typeof ingredients == "undefined") {
      console.log("Ingredients can not be empty");
      return;
    }

    let creator = "schan";
    let recipeData = {
      name: data.recipeName,
      time: data.recipeTime,
      servings: data.recipeServings,
      ingredients: ingredients,
      description: data.recipeDescription,
      instructions: data.recipeInstructions,
      creator: creator
    };

    axios
      .post("http://localhost:4000/insertRecipe", recipeData)
      .then(() => {
        this.props.toastOpen({
          text: "Uploaded!"
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="uploadBody">
        <div className="uploadTitle">
          <DigitText.Heading3 text={"Upload"}></DigitText.Heading3>
        </div>
        <div className="uploadForm">
          <DigitForm
            onSubmit={(values, actions) => {
              console.log(values);
              this.handleUpload(values);
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
                      upperLabel: "Name of the recipe"
                    }}
                  />
                  <DigitFormField
                    name="recipeTime"
                    component={DigitTextField}
                    componentProps={{
                      upperLabel: "Cooking time",
                      lowerLabel: "In minutes"
                    }}
                  />
                  <DigitFormField
                    name="recipeServings"
                    component={DigitTextField}
                    componentProps={{
                      upperLabel: "Servings yielded"
                    }}
                  />
                  <DigitFormField
                    name="recipeDescription"
                    component={DigitTextArea}
                    componentProps={{
                      upperLabel: "What is this recipe?"
                    }}
                  />
                  <DigitFormField
                    name="recipeInstructions"
                    component={DigitTextArea}
                    componentProps={{
                      upperLabel: "How do you cook this?"
                    }}
                  />
                  <IngredientCreator
                    recipeIngredients={this.state.recipeIngredients}
                    handleAdd={this.handleAdd}
                    handleDelete={this.handleDelete}
                    changeIngredient={this.changeIngredient}
                    changeAmount={this.changeAmount}
                    changeMeassurement={this.changeMeassurement}
                    ingredientValue={this.state.currentIngredient}
                    amountValue={this.state.currentAmount}
                    meassurementValue={this.state.currentMeassurement}
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
    );
  }
}

export default UploadYup;
