import React from "react"
import { Row } from 'react-bootstrap';
import Ingredient from "./Ingredient"

export default function IngredientsContainer(props) {
  if (props.ings == null)
    return <div></div>

  const ingredients = props.ings.map((ing) =>
    <Ingredient
      key={ing.Id}
      id= {ing.Id}
      name={ing.Name}
      image_url={ing.Image}
      calories={ing.Calories}
      // only when using recipe form
      checkBox= {props.addToRec}
      sendToForm={props.handleCheckBoxChange}
    />);

  return (
    <div id="ingredientsCardContainer">
      <Row xs={1} sm={3} md={4} lg={5} className="g-2" style={{display: "flex", justifyContent: "center", marginTop:"13px"}}>
        {ingredients}
      </Row>
    </div>
  )
}