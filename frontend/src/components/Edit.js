import React, { Component } from "react";
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

    return <div className="recipeEditArea"></div>;
  }
}

export default Edit;
