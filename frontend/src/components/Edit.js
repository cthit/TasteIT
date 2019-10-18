import React, { Component } from "react";
import Upload from "./Upload";
import "./styles/Edit.css";

class Edit extends Component {
    constructor(props) {
        super(props);
        let currentRecipe = JSON.parse(localStorage.getItem("recipeData"));
        if (currentRecipe === null) {
            window.open("/", "_self");
        }
        this.state = {
            recipe: currentRecipe
        };
        localStorage.removeItem("recipeData");
    }

    render() {
        let currentRecipe = this.state.recipe;

        return (
            <div className="recipeEditArea">
                <Upload
                    recipeName={currentRecipe.name}
                    recipeTime={currentRecipe.time}
                    recipeServings={currentRecipe.servings}
                    recipeIngredients={currentRecipe.ingredients}
                    recipeDescription={currentRecipe.description}
                    recipeInstructions={currentRecipe.instructions}
                    editMode={true}
                />
            </div>
        );
    }
}

export default Edit;
