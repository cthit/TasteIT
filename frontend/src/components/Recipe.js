import React, { Component } from "react";
import ReactDOM from "react-dom";
import Edit from "@material-ui/icons/Edit";
import axios from "axios";
import {
    DigitText,
    DigitMarkdown,
    DigitDesign,
    DigitFAB,
    DigitButton
} from "@cthit/react-digit-components";
import Ingredientlist from "./elements/recipe/Ingredientlist.js";
import Instructions from "./elements/recipe/Instructions.js";
import "./styles/Recipe.css";
class Recipe extends Component {
    // TODO: Seperate each DigitText into separate elements for ease of styling'
    constructor(props) {
        super(props);
        let currentRecipe = JSON.parse(localStorage.getItem("recipeData"));
        this.state = {
            recipe: currentRecipe
        };
        localStorage.removeItem("recipeData");
    }

    formatTime = time => {
        return "Time: " + time + " min";
    };

    handleGoBack = () => {
        window.open("/", "_self");
    };

    openEdit = () => {
        localStorage.setItem("recipeData", JSON.stringify(this.state.recipe));
        window.open("/edit", "_self");
    };

    render() {
        let currentRecipe = this.state.recipe;
        return (
            <div className="recipeArea">
                <DigitDesign.Card abswidth="700px">
                    <div className="recipeBackButton">
                        <DigitButton
                            text="Back"
                            onClick={this.handleGoBack}
                            raised
                        />
                    </div>
                    <div className="recipeTitleArea">
                        <DigitText.Heading3 text={currentRecipe.name} />
                    </div>
                    <div className="recipeCreatorArea">
                        <DigitText.Subtitle2
                            text={"Author: " + currentRecipe.creator}
                        />
                    </div>
                    <div className="recipeDescriptionArea">
                        <DigitMarkdown
                            markdownSource={currentRecipe.description}
                        />
                    </div>
                    <div className="recipeTimeArea">
                        <DigitText.Text
                            text={this.formatTime(currentRecipe.time)}
                        />
                    </div>
                    <div className="recipeIngredientsArea">
                        <DigitText.Text text="Ingredients:" />
                        <Ingredientlist
                            className="ingredients"
                            ingredients={currentRecipe.ingredients}
                        />
                    </div>

                    <div className="recipeInstructionsArea">
                        <Instructions
                            instructions={currentRecipe.instructions}
                        />
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
