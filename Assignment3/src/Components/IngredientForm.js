import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, TextField } from '@mui/material';

export default function IngredientForm() {
  const navigate = useNavigate();
  const apiUrl = "http://localhost:52793/api/Ingredients"
  //const apiUrl = "http://proj.ruppin.ac.il/bgroup57/test2/tar6/api/Ingredients"

  const initialNewIngredient ={
    Name: "",
    Image: "",
    Calories: 0
  } 
  const [newIngredient, setNewIngredient] = useState(initialNewIngredient);

  const submitForm = () => {
    console.clear();
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(newIngredient),
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
          alert("ingredient added");
          console.log("fetch POST= ", result);
        },
        (error) => {
          console.log("err post=", error);
          return false;
        });
        navigate('../ViewIngredients');
  }

  const getChange = (e) => {
    let key = e.target.id;
    let value = e.target.value;
    setNewIngredient(prev => {
      prev[key] = (key==="Calories") ? parseInt(value) : value;
      return prev;
    })
  }

  return (
    <div className="container">
      <form onSubmit={submitForm}>
        <FormControl id="ingredientForm">
          <h2 className="formTitle">Add new ingredient: </h2>
          <TextField onChange={getChange} id="Name" label="Name" variant="filled" required/>
          <TextField onChange={getChange} id="Image" label="Image" variant="filled" required/>
          <TextField onChange={getChange} id="Calories" label="Calories" variant="filled" required type="number"/>
          <div className="formBtn">
            <Button type="submit">Create Ingredient</Button>
            <Button onClick={() => navigate('/')}>Cancel</Button>
          </div>
        </FormControl>
      </form>
    </div>
  );
}
