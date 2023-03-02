import React from "react";
import "./style.css";
import { Checkbox } from '@mui/material';
import { Card } from 'react-bootstrap'

export default function Ingredient(props) {

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <Card>
          <Card.Img className="ingredientImg" src={props.image_url} alt=""/>
          <Card.Body>
            <Card.Title><u>{props.name}</u></Card.Title>
            <Card.Text>
              Calories: {props.calories}
            </Card.Text>
            {
              (props.checkBox) ?
                <Checkbox
                  label={props.name}
                  onChange={() => props.sendToForm(props.id)}
                  id = {props.id + ""}
                />
                : ""
            }
          </Card.Body>
        </Card>
    </div>
  );
}
