import React, { Component } from "react";
import {
  DigitText,
  DigitCheckbox,
  DigitLayout
} from "@cthit/react-digit-components";
import "./styles/IngredientList.css";

class Ingredientlist extends Component {
  createIngredients = item => {
    // Replace with JSON
    let text = item[1] + " " + item[2] + " " + item[0];
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
      <div className="ingredientListArea">
        <DigitLayout.UniformGrid
          minItemWidth="240px"
          minItemHeight="78px"
          rowGap="20px"
          columnGap="20px"
        >
          {listItems}
        </DigitLayout.UniformGrid>
      </div>
    );
  }
}

export default Ingredientlist;
