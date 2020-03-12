import React, { Component } from "react";
import Edit from "@material-ui/icons/Edit";
import axios from "axios";
import {
  DigitText,
  DigitMarkdown,
  DigitDesign,
  DigitFAB,
  DigitButton
} from "@cthit/react-digit-components";
import Ingredientlist from "./elements/recipe/Ingredientlist.jsx";
import Instructions from "./elements/recipe/Instructions.jsx";
import "./elements/recipe/styles/Recipe.css";
class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        name: "",
        time: "",
        servings: "",
        ingredients: [],
        description: "",
        instructions: "",
        creator: "",
        id: ""
      }
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/getRecipe/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          recipe: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  formatTime = time => {
    return "Time: " + time + " min";
  };

  handleGoBack = () => {
    window.open("/", "_self");
  };

  openEdit = () => {
    this.props.history.push("/edit/" + this.state.recipe.id);
  };

  render() {
    let currentRecipe = this.state.recipe;
    return (
      <div className="recipeArea">
        <DigitDesign.Card abswidth="700px">
          <div className="recipeBackButton">
            <DigitButton text="Back" onClick={this.handleGoBack} raised />
          </div>
          <div className="recipeTitleArea">
            <DigitText.Heading3 text={currentRecipe.name} />
          </div>
          <div className="recipeCreatorArea">
            <DigitText.Subtitle2 text={"Author: " + currentRecipe.creator} />
          </div>
          <div className="recipeDescriptionArea">
            <DigitMarkdown markdownSource={currentRecipe.description} />
          </div>
          <div className="recipeTimeArea">
            <DigitText.Text text={this.formatTime(currentRecipe.time)} />
          </div>
          <div className="recipeIngredientsArea">
            <DigitText.Text text="Ingredients:" />
            <Ingredientlist
              className="ingredients"
              ingredients={currentRecipe.ingredients}
            />
          </div>

          <div className="recipeInstructionsArea">
            <Instructions instructions={currentRecipe.instructions} />
          </div>
          <div className="recipeFabArea">
            <DigitFAB icon={Edit} primary onClick={this.openEdit} />
          </div>
        </DigitDesign.Card>
      </div>
    );
  }
}

export default Recipe;
