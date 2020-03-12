import React, { Component } from "react";
import { DigitCheckbox } from "@cthit/react-digit-components";
import "./styles/IngredientList.css";

class Ingredientlist extends Component {
  createIngredients = item => {
    // Replace with JSON
    let text = item.ingredient + " " + item.meassurement + " " + item.amount;
    return (
      <div className="ingredientListItem">
        <DigitCheckbox label={text} primary />
      </div>
    );
  };

  render() {
    // ingredients should be an array of strings
    var ingredientList = this.props.ingredients;
    var listItems = ingredientList.map(this.createIngredients);

    return (
      /*
      <ul className="ingredientList">
        {listItems}
      </ul>
      */
      <div className="ingredientListArea">{listItems}</div>
    );
  }
}

export default Ingredientlist;
