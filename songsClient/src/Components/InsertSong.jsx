import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, TextField } from '@mui/material';
import Header from './Header';
import "./style.css";

export default function InsertSong() {
  // 44380
  const apiUrl = "http://localhost:52793/api/Songs"
  const navigate = useNavigate();

  const initialNewSong = {
    Name: "",
    Singer: "",
    Genre: "",
    ReleasedYear: 0
  }
  const [newSong, setNewSong] = useState(initialNewSong);

  const submitForm = () => {
    console.clear();
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(newSong),
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
          alert("song added");
          console.log("fetch POST= ", result);
        },
        (error) => {
          console.log("err post=", error);
          return false;
        });
    //navigate('../HomePage');
  }

  const getChange = (e) => {
    let key = e.target.id;
    let value = e.target.value;
    setNewSong(prev => {
      prev[key] = (key === "ReleasedYear") ? parseInt(value) : value;
      return prev;
    })

    console.log(newSong);
  }

  return (
    <div className="container">
      <form onSubmit={submitForm}>
        <FormControl id="ingredientForm">
          <Header text={"Add new song:"}/>
          <TextField onChange={getChange} id="Name" label="Name" variant="filled" required />
          <TextField onChange={getChange} id="Singer" label="Singer" text="scsc" variant="filled" required />
          <TextField onChange={getChange} id="Genre" label="Genre" variant="filled" required />
          <TextField onChange={getChange} id="ReleasedYear" label="Released Year" variant="filled" required type="number" />
          <div className="formBtn">
            <Button variant="contained" type="submit">Add Song</Button>
            <Button variant="contained" onClick={() => navigate('/')}>Cancel</Button>
          </div>
        </FormControl>
      </form>
    </div>
  );
}

