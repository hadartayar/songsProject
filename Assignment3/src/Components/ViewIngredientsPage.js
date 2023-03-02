import React from "react";
import IngredientsContainer from "./IngredientsContainer";
import { useState, useEffect } from 'react';
import Header from "./Header"


export default function ViewIngredientsPage(props) {
  const apiUrl = "http://localhost:52793/api/Ingredients";
  //const apiUrl = "http://proj.ruppin.ac.il/bgroup57/test2/tar6/api/Ingredients"
  const [ingredients, setIngredients] = useState(null);

  const getAllIngredients = () => {
 // Fetch the ingredients here
    fetch(apiUrl, {
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
          console.log("fetch Ingredients= ", result);
          setIngredients(result)
        },
        (error) => {
          console.log("err post=", error);
        });
      }
  

  useEffect(getAllIngredients,[]);

  return (
    <div>
      <Header text={"All Ingredients"} />
      <IngredientsContainer ings={ingredients}/>
    </div>
  );
}
