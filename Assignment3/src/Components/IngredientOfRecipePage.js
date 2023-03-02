import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import IngredientsContainer from "./IngredientsContainer";
import ArrowBack from './ArrowBack';
import Header from "./Header";
import "./style.css";

export default function IngredientOfRecipePage() {
  const apiUrl = "http://localhost:52793/api/TotalRecipes"
  //const apiUrl = "http://proj.ruppin.ac.il/bgroup57/test2/tar6/api/TotalRecipes"
  const [ingredients, setIngredients] = useState(null);
  const recId = useLocation().state.recId;
  const recName = useLocation().state.recName;

  const getIngsOfRec = () => {
    console.log(recId)
    // Fetch the ingredients of the recipe here
    fetch(apiUrl + `/${recId}`, {
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
          setIngredients(result);
        },
        (error) => {
          console.log("err =", error);
        });
  }

  useEffect(getIngsOfRec ,[]);

  return (
    <div>
      <ArrowBack />
      <Header text={recName}/>
      <IngredientsContainer ings={ingredients} />
    </div>
  )
}
