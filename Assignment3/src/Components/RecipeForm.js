import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, FormControl, TextField } from '@mui/material';
import IngredientsContainer from "./IngredientsContainer";

export default function RecipeForm() {
  const navigate = useNavigate();
  const apiUrlTotalRecipes = "http://localhost:52793/api/TotalRecipes"
  const apiUrlRecipes = "http://localhost:52793/api/Recipes"
  const apiUrlIngredients = "http://localhost:52793/api/Ingredients"

  // const apiUrlTotalRecipes = "http://proj.ruppin.ac.il/bgroup57/test2/tar6/api/TotalRecipes"
  // const apiUrlRecipes = "http://proj.ruppin.ac.il/bgroup57/test2/tar6/api/Recipes"
  // const apiUrlIngredients = "http://proj.ruppin.ac.il/bgroup57/test2/tar6/api/Ingredients"

  const initialNewRecipe = {
    Recipe: {
      Id: 0,
      Name: "",
      CookingMethod: "",
      Time: "",
      Image: ""
    },
    IngIdArr: []
  }

  const [ingredients, setIngredients] = useState(null);
  const [newRecipe, setNewRecipe] = useState(initialNewRecipe)


  const getRecNextID = () => {
    fetch(apiUrlRecipes, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      })
    })
      .then(res => {
        console.log('res=', res);
        return res.json()
      })
    .then(
      (result) => {
        console.log("Recipes Length= ", result.length);
        setNewRecipe(prev => {
          prev.Recipe.Id = result.length
          return prev;
        })
      },
      (error) => {
        console.log("err get next recipe id =", error);
      });
  }

  const getAllIngredients = () => {
  fetch(apiUrlIngredients, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json; charset=UTF-8',
    })
  })
    .then(res => {
      console.log('res=', res);
      return res.json()
    })
    .then(
      (result) => {
        console.log("fetch Ingredients= From Form", result);
        setIngredients(result)
      },
      (error) => {
        console.log("err get all ings=", error);
      });
    }

const postRecipe = () => {
  fetch(apiUrlTotalRecipes, {
    method: 'POST',
    body: JSON.stringify(newRecipe),
    headers: new Headers({
      'Content-type': 'application/json; charset=UTF-8', //very important to add the 'charset=UTF-8'!!!!
      'Accept': 'application/json; charset=UTF-8'
    })
  })
    .then(res => {
      console.log('res=', res);
      return res.json()
    })
    .then(
      (result) => {
        console.log("fetch POST= ", result);
      },
      (error) => {
        console.log("err post recipe=", error);
      });
}

const getChange = (e) => {
  let key = e.target.id;
  let value = e.target.value;

  setNewRecipe(prev => {
    prev.Recipe[key] = (key==="Time") ? parseInt(value) : value;
    return prev;
  })
}

const checkBoxChange = (ing_id_str) => {
  let ing_id = parseInt(ing_id_str);

  setNewRecipe(prev => {
    if (prev.IngIdArr.includes(ing_id))
      newRecipe.IngIdArr.filter(id => id !== ing_id)
    else
      prev.IngIdArr.push(ing_id)
    return prev;
  })
}

const submitForm = () => {
  if (newRecipe.IngIdArr.length === 0) {
    alert("Please choose ingredients");
    return;
  }
  console.clear();
  postRecipe();
  navigate('/');
}

useEffect(getRecNextID, []);
useEffect(getAllIngredients, []);


return (
  <div className="container">
    <form onSubmit={submitForm}>
      <FormControl id="recipeForm">
        <h2 className="formTitle">Add new recipe:</h2>
        <TextField onChange={getChange} id="Name" label="Recipe Name:" variant="filled" required />
        <TextField onChange={getChange} id="CookingMethod" label="Recipe cooking method:" variant="filled" required />
        <TextField onChange={getChange} id="Time" label="Recipe cooking time:" variant="filled" required type="number"/>
        <TextField onChange={getChange} id="Image" label="Recipe Image (url)" variant="filled" required />

        <h4 style={{ marginTop: "10px", textAlign: "center" }}>Add Ingredients:</h4>
        <IngredientsContainer ings={ingredients} addToRec={true} handleCheckBoxChange={checkBoxChange} />
        
        <div className="formBtn">
          <Button type="submit">Create Recipe</Button>
          <Button onClick={() => navigate('/')}>Cancel</Button>
        </div>
      </FormControl>
    </form>
  </div>
);
}
