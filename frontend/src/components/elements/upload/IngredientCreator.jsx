import React, { Component } from "react";
import "./styles/IngredientCreator.css";
import IngredientItems from "./IngredientItems.jsx";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  DigitButton,
  DigitSelect,
  DigitTextField
} from "@cthit/react-digit-components";

class IngredientCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAmount: 1,
      currentIngredient: ""
    };
  }

  changeAmount = amount => {
    this.props.changeAmount(amount);
  };

  changeIngredient = ingredient => {
    this.props.changeIngredient(ingredient);
  };

  changeMeassurement = meassurement => {
    this.props.changeMeassurement(meassurement);
  };

  handleDelete = ingredientWithAmount => {
    this.props.handleDelete(ingredientWithAmount);
  };

  render() {
    return (
      <div className="ingredientCreatorArea">
        <div className="ingredientCreatorElement">
          <DigitTextField
            onChange={e => {
              this.changeIngredient(e.target.value);
            }}
            upperLabel="Ingredient"
            lowerLabel="Type in name of the ingredient"
            value={this.props.ingredientValue}
          />
        </div>
        <div className="ingredientCreatorElement">
          <TextField
            label="Amount of units"
            helperText="Type in the amount of units"
            type="number"
            value={this.props.amountValue}
            onChange={e => {
              this.changeAmount(e.target.value);
            }}
            InputLabelProps={{
              shrink: true
            }}
            style={{ width: 400 }}
          />
        </div>
        <div className="ingredientCreatorElement">
          <DigitSelect
            lowerLabel="Unit of meassurement for ingredient"
            value={this.props.meassurementValue}
            onChange={e => {
              this.changeMeassurement(e.target.value);
            }}
            valueToTextMap={{
              g: "g",
              ml: "ml",
              st: "st"
            }}
          />
        </div>
        <div className="addIngredientButtonDiv">
          <DigitButton
            text="Add"
            primary
            outlined
            onClick={() => {
              this.props.handleAdd();
            }}
          />
        </div>
        <div className="createdIngredientArea">
          <IngredientItems
            ingredients={this.props.recipeIngredients}
            handleDelete={this.handleDelete}
          />
        </div>
      </div>
    );
  }
}

export default IngredientCreator;
