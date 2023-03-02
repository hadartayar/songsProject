import React from "react";
// import "./style.css";
import { Card } from 'react-bootstrap'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function Recipe(props) {
  const navigate = useNavigate();
  const navigateTo = () => {
    const params = {
      recId: props.id,
      recName: props.name
    }
    navigate('IngredientOfRecipe', { state: params });
  }


  return (
    <div>
      <Card style={{ width: '18rem'}}>
        <Card.Img style={{height: "23vh"}} src={props.image_url} alt=""/>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
          Cooking Method:  {props.cooking_method}<br/>
          Total Cooking Time: {props.cooking_time} Minutes<br/>
          </Card.Text>
          <Button color="info" variant="outlined" onClick={navigateTo}>View Ingredients</Button>
        </Card.Body>
      </Card>
    </div>

  );
}
