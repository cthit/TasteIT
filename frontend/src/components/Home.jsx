import React, { Component } from "react";
import { DigitLayout } from "@cthit/react-digit-components";
import NewWindow from "react-new-window";
import ReactDOM from "react-dom";
import RecipeGridView from "./elements/home/RecipeGridView.jsx";
import Recipe from "./Recipe.jsx";
import axios from "axios";
import _ from "lodash";
import "./elements/home/styles/Home.css";

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

  handleDeleteRecipe = recipe => {
    axios
      .post("http://localhost:4000/deleteRecipe", recipe)
      .then(res => console.log(res))
      .catch(err => console.log(err));

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
    this.props.history.push("/recipe/" + recipe.id);
  };

  render() {
    return (
      <RecipeGridView
        recipes={this.state.recipes}
        isUserCreator={this.isUserCreator}
        handleMenu={this.handleMenu}
        handleDeleteRecipe={this.handleDeleteRecipe}
        handleOpenRecipe={this.handleOpenRecipe}
        history={this.props.history}
      />
    );
  }
}

export default Home;
