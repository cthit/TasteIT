import React, { Component } from "react";
import { DigitLayout } from "@cthit/react-digit-components";
import NewWindow from "react-new-window";
import ReactDOM from "react-dom";
import RecipeGridView from "./elements/home/RecipeGridView.jsx";
import Recipe from "./Recipe.jsx";
import axios from "axios";
import Cookies from "universal-cookie";
import _ from "lodash";
import "./elements/home/styles/Home.css";

const cookies = new Cookies();

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      currentUser: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/getAllRecipes")
      .then(res => {
        this.setState({
          recipes: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
    if (this.isUserTrue()) {
      let userData = { token: cookies.get("auth_cookie") };
      axios
        .post("http://localhost:4000/verifyToken", userData)
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
    console.log(this.state);
  }

  isUserCreator = creator => {
    let user = this.state.currentUser;
    if (creator == user) {
      console.log(true);
      return true;
    } else {
      console.log(false);
      return false;
    }
  };

  /*
  isUserCreator = creator => {
    let userData = { token: cookies.get("auth_cookie") };
    let response = {};
    axios
      .post("http://localhost:4000/verifyToken", userData)
      .then(res => {
        response = res.data;
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
    if (response.body.cid == creator) {
      return true;
    }
  };
  */

  isUserTrue = () => {
    let user = cookies.get("auth_cookie");
    if (typeof user === "undefined" || user == "") {
      return false;
    } else {
      return true;
    }
  };

  handleDeleteRecipe = recipe => {
    axios
      .post("http://localhost:4000/deleteRecipe", recipe)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    let currentRecipes = this.state.recipes;
    const index = currentRecipes.findIndex(r => r.id === recipe.id);
    currentRecipes.splice(index, 1);
    this.setState({
      recipes: currentRecipes
    });

    /*
        for (let i = 0; i < currentRecipes.length; i++) {
            if (JSON.stringify(currentRecipes[i]) === JSON.stringify(recipe)) {
                currentRecipes.splice(i, 1);
                this.setState({
                    recipes: currentRecipes
                });
            }
        }
        */
    // Send to backend
  };

  handleOpenRecipe = recipe => {
    this.props.history.push("/recipe/" + recipe.id);
  };

  render() {
    return (
      <RecipeGridView
        recipes={this.state.recipes}
        isUserCreator={this.isUserCreator}
        handleMenu={this.handleMenu}
        handleDeleteRecipe={this.handleDeleteRecipe}
        handleOpenRecipe={this.handleOpenRecipe}
        history={this.props.history}
      />
    );
  }
}

export default Home;
