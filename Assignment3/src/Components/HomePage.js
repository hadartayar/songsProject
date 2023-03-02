import React, { useState, useEffect, useRef } from "react";
import RecipesContainer from "./RecipesContainer";
import Header from "./Header";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css'

export default function HomePage() {
  const apiUrl = "http://localhost:52793/api/Recipes"
  //const apiUrl = "http://proj.ruppin.ac.il/bgroup57/test2/tar6/api/Recipes";
  const [recipes, setRecipes] = useState(null);

  const getAllRecipes = () => {
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
          console.log("fetch Recipes= ", result);
          setRecipes(result);
        },
        (error) => {
          console.log("err post=", error);
        });
  }

  useEffect(getAllRecipes, []);

  return (
    <div>
      <Header text={"my kitchen"} />
      <RecipesContainer recs={recipes} />
    </div>
  )
}
