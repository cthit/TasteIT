import React, { Component } from "react";
import { DigitChip } from "@cthit/react-digit-components";
import "./styles/IngredientItems.css";

class IngredientItems extends Component {
  handleDelete = ingredient => {
    this.props.handleDelete(ingredient);
  };

  formatText = i => {
    const { amount, meassurement, ingredient } = i;
    return amount + " " + meassurement + " " + ingredient;
  };

  render() {
    if (this.props.ingredients == null) {
      return null;
    }
    console.log(this.props);
    return (
      <ul className="ingredientList">
        {this.props.ingredients.map((ingredient, i) => {
          const text = this.formatText(ingredient);

          return (
            <DigitChip
              key={text}
              primary
              label={text}
              onDelete={() => {
                this.handleDelete(i);
              }}
            />
          );
        })}
      </ul>
    );
  }
}

export default IngredientItems;
