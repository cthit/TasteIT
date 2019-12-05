import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import axios from "axios";
import IngredientCreator from "./elements/upload/IngredientCreator.js";
import {
  DigitDesign,
  DigitText,
  DigitTextField,
  DigitTextArea,
  DigitButton,
  DigitForm
} from "@cthit/react-digit-components";
import * as yup from "yup";
import "./styles/Upload.css";

class Upload extends Component {
  /*
  Format of recipe as a JSON object:
    name
    time
    servings
    ingredients [ingredient, amount, meassurement]
    description
    instructions
    creator (preferably in form of cid)
  */
  constructor(props) {
    super(props);
    this.state = {
      recipeName: this.props.recipeName,
      recipeTime: this.props.recipeTime,
      recipeServings: this.props.recipeServings,
      recipeIngredients: this.props.recipeIngredients,
      recipeDescription: this.props.recipeDescription,
      recipeInstructions: this.props.recipeInstructions,
      recipeId: this.props.recipeId,
      currentIngredient: this.props.currentIngredient,
      currentAmount: this.props.currentAmount,
      currentMeassurement: this.props.currentMeassurement,
      editMode: this.props.editMode,
      noName: false,
      oldName: this.props.recipeName
    };
  }

  changeIngredient = ingredient => {
    this.setState({
      currentIngredient: ingredient
    });
  };

  changeAmount = amount => {
    this.setState({
      currentAmount: amount
    });
  };

  changeMeassurement = meassurement => {
    this.setState({
      currentMeassurement: meassurement
    });
  };

  handleDelete = ingredientWithAmount => {
    let newRecipeIngredients = this.state.recipeIngredients;
    let index = newRecipeIngredients.indexOf(ingredientWithAmount);
    if (index !== -1) {
      newRecipeIngredients.splice(index, 1);
      this.setState({
        recipeIngredients: newRecipeIngredients
      });
    }
  };

  // TODO: Create validator or use yup
  checkValidation = recipe => {
    if (this.state.recipeName != "") {
      return true;
    } else {
      this.setState({
        noName: true
      });
      return false;
    }
  };

  render() {
    return (
      <div className="uploadBody">
        <div className="uploadTitle">
          <DigitText.Heading3 text={this.modeText()} />
        </div>
        <DigitDesign.Card abswidth="400px">
          <div className="uploadForm">
            <div className="recipeFormElement">
              <DigitTextField
                onChange={e => {
                  this.setState({
                    recipeName: e.target.value
                  });
                }}
                value={this.state.recipeName}
                error={this.state.noName}
                upperLabel="Recipe name (Required)"
                lowerLabel="Required"
              />
            </div>
            <div className="recipeFormElement">
              <TextField
                label="Recipe time (Required)"
                helperText="Time in minutes"
                type="number"
                value={this.state.recipeTime}
                onChange={e => {
                  this.setState({
                    recipeTime: e.target.value
                  });
                }}
                error={this.state.recipeTime == ""}
                InputLabelProps={{
                  shrink: true
                }}
                style={{ width: 460 }}
              />
            </div>
            <div className="recipeFormElement">
              <TextField
                label="Recipe servings (Required)"
                helperText="Amount of servings"
                type="number"
                value={this.state.recipeServings}
                onChange={e => {
                  this.setState({
                    recipeServings: e.target.value
                  });
                }}
                error={this.state.recipeServings == ""}
                InputLabelProps={{
                  shrink: true
                }}
                style={{ width: 460 }}
              />
            </div>
            <div className="recipeFormElement">
              <IngredientCreator
                recipeIngredients={this.state.recipeIngredients}
                handleAdd={this.handleAdd}
                handleDelete={this.handleDelete}
                changeIngredient={this.changeIngredient}
                changeAmount={this.changeAmount}
                changeMeassurement={this.changeMeassurement}
                ingredientValue={this.state.currentIngredient}
                amountValue={this.state.currentAmount}
                meassurementValue={this.state.currentMeassurement}
              />
            </div>
            <div className="recipeFormElement">
              <DigitTextArea
                onChange={e => {
                  this.setState({
                    recipeDescription: e.target.value
                  });
                }}
                value={this.state.recipeDescription}
                upperLabel="Recipe description"
                lowerLabel="Markdown supported"
                rows={4}
              />
            </div>
            <div className="recipeFormElement">
              <DigitTextArea
                onChange={e => {
                  this.setState({
                    recipeInstructions: e.target.value
                  });
                }}
                value={this.state.recipeInstructions}
                upperLabel="Recipe instructions"
                lowerLabel="Markdown supported"
                rows={4}
              />
            </div>
          </div>
          <div className="uploadButtonDiv">
            <DigitButton
              text={this.modeText()}
              primary
              raised
              onClick={this.handleUpload}
            />
          </div>
        </DigitDesign.Card>
      </div>
    );
  }
}

Upload.propTypes = {
  recipeName: PropTypes.string,
  recipeTime: PropTypes.string,
  recipeServings: PropTypes.string,
  recipeIngredients: PropTypes.array,
  recipeDescription: PropTypes.string,
  recipeInstructions: PropTypes.string,
  recipeId: PropTypes.string,
  currentIngredient: PropTypes.string,
  currentAmount: PropTypes.string,
  currentMeassurement: PropTypes.string,
  editMode: PropTypes.bool
};

Upload.defaultProps = {
  recipeName: "",
  recipeTime: "0",
  recipeServings: "0",
  recipeIngredients: [],
  recipeDescription: "",
  recipeInstructions: "",
  currentIngredient: "",
  currentAmount: "",
  currentMeassurement: "g",
  editMode: false
};

export default Upload;
