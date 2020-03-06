import React from "react";
import {
  DigitEditDataCard,
  DigitTextField,
  DigitTextArea
} from "@cthit/react-digit-components";
import * as yup from "yup";
import IngredientCreator from "../../../components/elements/upload/IngredientCreator";

const RecipeForm = ({
  initialValues = {
    name: "",
    time: "",
    servings: "",
    description: "",
    instructions: "",
    ingredients: []
  },
  onSubmit,
  submitText
}) => {
  return (
    <DigitEditDataCard
      initialValues={initialValues}
      keysOrder={[
        "name",
        "time",
        "servings",
        "description",
        "instructions",
        "ingredients"
      ]}
      keysComponentData={{
        name: {
          component: DigitTextField,
          componentProps: {
            upperLabel: "Name of the recipe"
          }
        },
        time: {
          component: DigitTextField,
          componentProps: {
            upperLabel: "Cooking time",
            lowerLabel: "In minutes",
            numbersOnly: true
          }
        },
        servings: {
          component: DigitTextField,
          componentProps: {
            upperLabel: "Servings yielded",
            numbersOnly: true
          }
        },
        description: {
          component: DigitTextArea,
          componentProps: {
            upperLabel: "What is this recipe?"
          }
        },
        instructions: {
          component: DigitTextArea,
          componentProps: {
            upperLabel: "How do you cook this?"
          }
        },
        ingredients: {
          component: IngredientCreator,
          componentProps: {},
          array: true
        }
      }}
      validationSchema={yup.object().shape({
        name: yup.string().required("This can't be empty"),
        time: yup.string().required("This can't be empty"),
        servings: yup.string().required("This can't be empty"),
        description: yup.string().required("This can't be empty"),
        instructions: yup.string().required("This can't be empty")
      })}
      onSubmit={onSubmit}
      submitText={submitText}
    />
  );
};

export default RecipeForm;
