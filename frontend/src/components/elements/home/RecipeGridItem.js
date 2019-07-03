import React, { Component } from "react";
import {
    DigitText,
    DigitButton,
    DigitMenu,
    DigitDesign
} from "@cthit/react-digit-components";
import "./RecipeGridItem.css";

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
            localStorage.setItem(
                "recipeData",
                JSON.stringify(this.props.recipe)
            );

            // Route to edit page
            window.open("/edit", "_blank");
        }
    };

    handleDeleteRecipe = () => {
        // TODO: Send backend request to delete and route back to homepage
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
            return <div />;
        }
    };

    render() {
        return (
            <div className="RecipeGridItem">
                <DigitDesign.Card absWidth="320px" absHeight="220px">
                    <div className="recipeGridContent">
                        <div className="recipeTitle">
                            <DigitText.Title
                                className="recipeTitle"
                                text={this.state.recipeName}
                            />
                        </div>
                        <div className="recipeMenu">
                            {this.renderMenuIfCreator()}
                        </div>
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
