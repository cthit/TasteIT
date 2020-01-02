import React, { Component } from "react";
import { DigitLayout } from "@cthit/react-digit-components";
import RecipeGridItem from "./RecipeGridItem.jsx";
import "./styles/RecipeGridView.css";

class RecipeGridView extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.recipes);
    this.state = {
      recipes: this.props.recipes
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      recipes: nextProps.recipes
    });
  }

  handleMenu = choice => recipe => {
    this.props.handleMenu(choice, recipe);
  };

  handleDeleteRecipe = recipe => {
    this.props.handleDeleteRecipe(recipe);
  };

  handleOpenRecipe = recipe => {
    this.props.handleOpenRecipe(recipe);
  };

  renderGridElements = item => {
    return (
      <RecipeGridItem
        key={item.id}
        recipe={item}
        isUserCreator={this.props.isUserCreator(item.creator)}
        handleMenu={this.handleMenu}
        handleDeleteRecipe={this.handleDeleteRecipe}
        handleOpenRecipe={this.handleOpenRecipe}
      />
    );
  };

  render() {
    let toBeRendered = this.state.recipes;
    let gridElements = toBeRendered.map(this.renderGridElements);

    return (
      <div className="recipeGrid">
        <DigitLayout.UniformGrid
          minItemWidth="300px"
          minItemHeight="200px"
          rowGap="30px"
          columnGap="30px"
        >
          {gridElements}
        </DigitLayout.UniformGrid>
      </div>
    );
  }
}

export default RecipeGridView;
