import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { Button, FormControl, TextField } from '@mui/material';
import Header from './Header';
import "./style.css";

export default function EditSong(props) {
  const apiUrl = "http://localhost:52793/api/Songs"
  const navigate = useNavigate();
  const songId = useLocation().state.songId;
  console.log(songId);
  const [song, setSong] = useState(null);

  const getSongById = () => {
    console.log(songId)
    // Fetch the ingredients of the recipe here
    fetch(apiUrl + + `/${songId}`, {
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
          console.log("fetch song by Id= ", result);
          setSong(result);
        },
        (error) => {
          console.log("err =", error);
        });
  }

  useEffect(getSongById ,[]);

  // const initialNewSong = {
  //   Name: props.Name,
  //   Singer: props.Singer,
  //   Genre: props.Genre,
  //   ReleasedYear: props.ReleasedYear
  // }
  // const [newSong, setNewSong] = useState(initialNewSong);

  const submitForm = () => {
    console.clear();
    fetch(apiUrl, {
      method: 'PUT',
      body: JSON.stringify(song),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
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
          console.log("fetch PUT= ", result);
        },
        (error) => {
          console.log("err PUT=", error);
          return false;
        });
    // navigate('../HomePage');
  }

  const getChange = (e) => {
    let key = e.target.id;
    let value = e.target.value;
    setSong(prev => {
      prev[key] = (key === "ReleasedYear") ? parseInt(value) : value;
      return prev;
    })

    console.log(song);
  }

  return (
    <div className="container">
      <form onSubmit={submitForm}>
        <FormControl id="ingredientForm">
          <Header text= {"Edit Song:"}/>
          {/* <TextField onChange={getChange} id="Name" label="Name" defaultValue={song.songName} variant="filled" required />
          <TextField onChange={getChange} id="Singer" label="Singer" defaultValue={song.singer} variant="filled" required />
          <TextField onChange={getChange} id="Genre" label="Genre" defaultValue={song.genre} variant="filled" required />
          <TextField onChange={getChange} id="ReleasedYear" label="Released Year" defaultValue={song.releasedYear} variant="filled" required type="number" /> */}
          <div className="formBtn">
            <Button variant="contained" type="submit">Update Song</Button>
            <Button variant="contained" onClick={() => navigate('/')}>Cancel</Button>
          </div>
        </FormControl>
      </form>
    </div>
  );
}