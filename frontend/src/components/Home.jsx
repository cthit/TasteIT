import React, { Component } from "react";
import RecipeGridView from "./elements/home/RecipeGridView.jsx";
import axios from "axios";
import Cookies from "universal-cookie";
import * as Domain from "../common/elements/Domain.jsx";
import * as User from "../common/elements/User.jsx";
import "./elements/home/styles/Home.css";

const cookies = new Cookies();

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      currentUser: ""
    };
    console.log(User.getCurrentUser());
  }

  componentDidMount() {
    let domain = Domain.getDomain();

    axios
      .get(domain + ":4000/getAllRecipes")
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

  isUserCreator = creator => {
    let user = this.state.currentUser;
    if (creator == user) {
      return true;
    } else {
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
    let domain = this.getDomain();
    axios
      .post(domain + ":4000/deleteRecipe", recipe)
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
    console.log(User.getCurrentUser());
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
