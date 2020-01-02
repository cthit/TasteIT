import React, { Component } from "react";
import { DigitText, DigitTooltip } from "@cthit/react-digit-components";
import "./styles/IngredientItems.css";

class IngredientItems extends Component {
  handleDelete = ingredient => {
    this.props.handleDelete(ingredient);
  };

  formatText = ingredient => {
    let ing = ingredient[0];
    let amount = ingredient[1];
    let meassurement = ingredient[2];

    return amount + " " + meassurement + " " + ing;
  };

  render() {
    return (
      <ul className="ingredientList">
        {this.props.ingredients.map(ingredient => {
          let itemKey = Math.floor(Math.random() * 1000 + 1);
          return (
            <DigitTooltip text="Click to delete">
              <li
                onClick={() => {
                  this.handleDelete(ingredient);
                }}
                // Generate a random number to use as key
                key={itemKey}
              >
                <DigitText.Text
                  text={this.formatText(ingredient)}
                  white={true}
                />
              </li>
            </DigitTooltip>
          );
        })}
      </ul>
    );
  }
}

export default IngredientItems;
