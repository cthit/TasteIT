import React, { Component } from "react";
import { DigitLayout } from "@cthit/react-digit-components";
import NewWindow from "react-new-window";
import ReactDOM from "react-dom";
import RecipeGridView from "./elements/home/RecipeGridView";
import Recipe from "./Recipe";
import EditRecipe from "./Edit";
import axios from "axios";
import _ from "lodash";
import "./styles/Home.css";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: []
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:4000/getAllRecipes")
            .then(res => {
                console.log(res.data);
                this.setState({
                    recipes: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    isUserCreator = creator => {
        /*
      Checks if the creator of recipe is the current user, currently
      hardcoded
    */
        return true;
    };

    handleMenu = choice => recipe => {
        if (choice === "edit_recipe") {
            localStorage.setItem("recipeData", recipe);
            // Route to edit page
            window.open("/edit", "_self");
        } else {
            this.handleDeleteRecipe(recipe);
        }
    };

    handleDeleteRecipe = recipe => {
        let currentRecipes = this.state.recipes;
        const index = currentRecipes.findIndex(r => r.id === recipe.id);
        currentRecipes.splice(index, 1);
        this.setState({
            recipes: currentRecipes
        });

        /*
        for (let i = 0; i < currentRecipes.length; i++) {
            if (JSON.stringify(currentRecipes[i]) === JSON.stringify(recipe)) {
                currentRecipes.splice(i, 1);
                this.setState({
                    recipes: currentRecipes
                });
            }
        }
        */
        // Send to backend
    };

    handleOpenRecipe = recipe => {
        localStorage.setItem("recipeData", JSON.stringify(recipe));
        window.open("/recipe", "_self");
    };

    render() {
        console.log(this.state.recipes);
        return (
            <RecipeGridView
                recipes={this.state.recipes}
                isUserCreator={this.isUserCreator}
                handleMenu={this.handleMenu}
                handleDeleteRecipe={this.handleDeleteRecipe}
                handleOpenRecipe={this.handleOpenRecipe}
            />
        );
    }
}

export default Home;
