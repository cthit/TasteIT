import React, { useState } from "react";
import "./styles/IngredientCreator.css";
import IngredientItems from "./IngredientItems.jsx";
import { TextField } from "@material-ui/core";
import {
  DigitButton,
  DigitSelect,
  DigitTextField
} from "@cthit/react-digit-components";

const IngredientCreator = ({ value, push, remove }) => {
  const [amount, setAmount] = useState(0);
  const [ingredient, setIngredient] = useState("");
  const [meassurement, setMeassurement] = useState("g");

  return (
    <React.Fragment>
      <DigitTextField
        onChange={e => {
          setIngredient(e.target.value);
        }}
        upperLabel="Ingredient"
        lowerLabel="Type in name of the ingredient"
        value={ingredient}
      />
      <TextField
        label="Amount of units"
        helperText="Type in the amount of units"
        type="number"
        value={amount}
        onChange={e => {
          setAmount(e.target.value);
        }}
        InputLabelProps={{
          shrink: true
        }}
        style={{ width: 400 }}
      />
      <DigitSelect
        lowerLabel="Unit of meassurement for ingredient"
        value={meassurement}
        onChange={e => {
          setMeassurement(e.target.value);
        }}
        valueToTextMap={{
          g: "g",
          ml: "ml",
          st: "st"
        }}
      />
      <DigitButton
        text="Add"
        primary
        outlined
        onClick={() => push({ amount, ingredient, meassurement })}
      />
      <IngredientItems
        ingredients={value}
        handleDelete={i => {
          remove(i);
        }}
      />
    </React.Fragment>
  );
};

export default IngredientCreator;
