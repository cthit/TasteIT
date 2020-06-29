import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { DigitText, useDigitToast } from "@cthit/react-digit-components";
import "./styles/Edit.css";
import RecipeForm from "../common/elements/recipe-form";
import * as Domain from "../common/elements/Domain.jsx";

const cookies = new Cookies();

const domain = Domain.getDomain();

const currentUser = () => {
  let domain = domain();
  let userData = { token: cookies.get("auth_cookie") };
  axios
    .post(domain + ":4000/verifyToken", userData)
    .then(res => {
      let response = res.data;
      return response.creator;
    })
    .catch(err => {
      console.log(err);
    });
};

const handleEdit = (id, data, queueToast) => {
  let domain = domain();
  let creator = currentUser();
  let recipeData = {
    ...data,
    creator: creator,
    id: id
  };

  axios
    .post(domain + ":4000/editRecipe", recipeData)
    .then(() => {
      queueToast({
        text: "Edited!"
      });
    })
    .catch(err => {
      console.log(err);
      queueToast({
        text: "Something went wrong"
      });
    });
};

const Edit = ({ match }) => {
  const [queueToast] = useDigitToast();
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    let domain = domain();
    axios
      .get(domain + ":4000/getRecipe/" + match.params.id)
      .then(response => {
        setRecipeData(response.data);
      })
      .catch(err => {
        queueToast({
          text: "Something went wrong when getting the recipe"
        });
        console.log(err);
      });
  }, []);

  if (recipeData == null) {
    return null;
  }

  return (
    <div className="editBody">
      <div className="editTitle">
        <DigitText.Heading3 text={"Edit"} />
      </div>
      <div className="editForm">
        <RecipeForm
          onSubmit={(values, actions) => {
            handleEdit(match.params.id, values, queueToast);
          }}
          submitText="Change recipe"
          initialValues={recipeData}
        />
      </div>
    </div>
  );
};

export default Edit;
