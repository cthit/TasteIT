import React, { Component } from "react";
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
import IngredientCreator from "./elements/upload/IngredientCreator";
import "./styles/Edit.css";

class Edit extends Component {
  constructor(props) {
    super(props);
    let currentRecipe = JSON.parse(localStorage.getItem("recipeData"));
    if (currentRecipe === null) {
      window.open("/", "_self");
    }
    this.state = {
      recipe: currentRecipe,
      recipeIngredients: currentRecipe.ingredients,
      currentIngredient: "",
      currentAmount: "",
      currentMeassurement: ""
    };
    localStorage.removeItem("recipeData");
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
    console.log(this.state);
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
    console.log(this.state);
  };

  handleEdit = data => {
    let ingredients = this.state.recipeIngredients;
    if (typeof ingredients == "undefined") {
      console.log("Ingredients cannot be empty");
      return;
    }

    let creator = this.state.recipe.creator;
    let id = this.state.recipe.id;
    let recipeData = {
      name: data.recipeName,
      time: data.recipeTime,
      servings: data.recipeServings,
      ingredients: ingredients,
      description: data.recipeDescription,
      instructions: data.recipeInstructions,
      creator: creator,
      id: id
    };

    axios
      .post("http://localhost:4000/editRecipe", recipeData)
      .then(() => {
        this.props.toastOpen({
          text: "Edited!"
        });
      })
      .catch(err => {
        console.log(err);
        this.props.toastOpen({
          text: "Something went wrong"
        });
      });
  };

  render() {
    let currentRecipe = this.state.recipe;

    return (
      <div className="editBody">
        <div className="editTitle">
          <DigitText.Heading3 text={"Edit"} />
        </div>
        <div className="editForm">
          <DigitForm
            onSubmit={(values, actions) => {
              this.handleEdit(values);
            }}
            initialValues={{
              recipeName: currentRecipe.name,
              recipeTime: currentRecipe.time,
              recipeServings: currentRecipe.servings,
              recipeDescription: currentRecipe.description,
              recipeInstructions: currentRecipe.instructions
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
                      upperLabel: "Cooking time in minutes"
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
                    <DigitButton primary raised submit text="Edit Recipe" />
                  </DigitDesign.CardButtons>
                </DigitDesign.CardBody>
              </DigitDesign.Card>
            )}
          ></DigitForm>
        </div>
      </div>
    );
  }
}

export default Edit;
