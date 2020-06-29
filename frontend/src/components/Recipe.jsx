import React, { Component } from "react";
import Edit from "@material-ui/icons/Edit";
import axios from "axios";
import Cookies from "universal-cookie";
import {
  DigitText,
  DigitMarkdown,
  DigitDesign,
  DigitFAB,
  DigitButton
} from "@cthit/react-digit-components";
import Ingredientlist from "./elements/recipe/Ingredientlist.jsx";
import Instructions from "./elements/recipe/Instructions.jsx";
import EditFAB from "./elements/recipe/EditFAB.jsx";
import * as Domain from "../common/elements/Domain.jsx";
import "./elements/recipe/styles/Recipe.css";

const cookies = new Cookies();

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        name: "",
        time: "",
        servings: "",
        ingredients: [],
        description: "",
        instructions: "",
        creator: "",
        id: "",
        currentUser: ""
      }
    };
  }

  componentDidMount() {
    let domain = Domain.getDomain();
    axios
      .get(domain + ":4000/getRecipe/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          recipe: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
    if (this.isUserTrue()) {
      let userData = { token: cookies.get("auth_cookie") };
      axios
        .post(domain + ":4000/verifyToken", userData)
        .then(res => {
          let response = res.data;
          this.setState({
            currentUser: response.body.cid
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  isUserTrue = () => {
    let user = cookies.get("auth_cookie");
    if (typeof user === "undefined" || user == "") {
      return false;
    } else {
      return true;
    }
  };

  isUserCreator = () => {
    let currentRecipe = this.state.recipe;
    let user = this.state.currentUser;
    if (currentRecipe.creator == user) {
      return true;
    } else {
      return false;
    }
  };

  formatTime = time => {
    return "Time: " + time + " min";
  };

  handleGoBack = () => {
    this.props.history.push("/");
  };

  openEdit = () => {
    this.props.history.push("/edit/" + this.state.recipe.id);
  };

  render() {
    let currentRecipe = this.state.recipe;
    return (
      <div className="recipeArea">
        <DigitDesign.Card abswidth="700px">
          <div className="recipeBackButton">
            <DigitButton text="Back" onClick={this.handleGoBack} raised />
          </div>
          <div className="recipeTitleArea">
            <DigitText.Heading3 text={currentRecipe.name} />
          </div>
          <div className="recipeCreatorArea">
            <DigitText.Subtitle2 text={"Author: " + currentRecipe.creator} />
          </div>
          <div className="recipeDescriptionArea">
            <DigitMarkdown markdownSource={currentRecipe.description} />
          </div>
          <div className="recipeTimeArea">
            <DigitText.Text text={this.formatTime(currentRecipe.time)} />
          </div>
          <div className="recipeIngredientsArea">
            <DigitText.Text text="Ingredients:" />
            <Ingredientlist
              className="ingredients"
              ingredients={currentRecipe.ingredients}
            />
          </div>

          <div className="recipeInstructionsArea">
            <Instructions instructions={currentRecipe.instructions} />
          </div>
          <div className="recipeFabArea">
            <EditFAB
              icon={Edit}
              onClick={this.openEdit}
              isCreator={this.isUserCreator()}
            />
          </div>
        </DigitDesign.Card>
      </div>
    );
  }
}

export default Recipe;
