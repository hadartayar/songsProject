import React from "react"
import Recipe from "./Recipe"

export default function RecipesContainer(props) {
  if (props.recs == null)
    return <div></div>

  const recipes = props.recs.map((rec) => 
        <Recipe
          key={rec.Id}
          id={rec.Id}
          name={rec.Name}
          image_url={rec.Image}
          cooking_method={rec.CookingMethod}
          cooking_time={rec.Time}
          calories={rec.Calories}
        />)

  return (
    <div id="dishesContainer">
      {recipes}
    </div>
  )
}

  