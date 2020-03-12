import React, { Component } from "react";
import {
  DigitText,
  DigitButton,
  DigitMenu,
  DigitDesign
} from "@cthit/react-digit-components";
import "./styles/RecipeGridItem.css";

class RecipeGridItem extends Component {
  constructor(props) {
    super(props);
    let recipe = this.props.recipe;
    this.state = {
      recipeName: recipe.name,
      recipeTime: recipe.time,
      // Rest of props are to be sent to recipe page
      recipeAmount: recipe.amount,
      recipeIngredients: recipe.ingredients,
      recipeDescription: recipe.description,
      recipeInstructions: recipe.instructions,
      recipeId: recipe.id,
      recipeCreator: recipe.creator
    };
  }

  openRecipePage = () => {
    this.props.handleOpenRecipe(this.props.recipe);
  };

  formatTime = () => {
    var str = "Time: ";
    var returnStr = str.concat(this.state.recipeTime, " min");
    return returnStr;
  };

  handleMenu = choice => {
    if (choice === "edit_recipe") {
      // Route to edit page
      //window.open("/edit", "_blank");
      this.props.history.push("/edit/" + this.state.recipeId);
    } else if (choice === "delete_recipe") {
      this.handleDeleteRecipe();
    }
  };

  handleDeleteRecipe = () => {
    this.props.handleDeleteRecipe(this.props.recipe);
  };

  renderMenuIfCreator = () => {
    let isCreator = this.props.isUserCreator;
    if (isCreator) {
      return (
        <DigitMenu
          onClick={value => {
            this.handleMenu(value);
          }}
          valueToTextMap={{
            edit_recipe: "Edit recipe",
            delete_recipe: "Delete recipe"
          }}
        />
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className="RecipeGridItem">
        <DigitDesign.Card width="320px" height="220px">
          <div className="recipeGridContent">
            <div className="recipeTitle">
              <DigitText.Title
                className="recipeTitle"
                text={this.state.recipeName}
              />
            </div>
            <div className="recipeMenu">{this.renderMenuIfCreator()}</div>
            <DigitText.Text text={this.formatTime()} />
            <div className="buttonDiv">
              <DigitButton
                text="Open recipe"
                onClick={this.openRecipePage}
                raised
              />
            </div>
          </div>
        </DigitDesign.Card>
      </div>
    );
  }
}

export default RecipeGridItem;
