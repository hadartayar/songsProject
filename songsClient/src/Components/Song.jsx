import React from 'react'
import "./style.css";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


export default function Song(props) {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const navigateTo = () => {
    const params = {
      songId: props.id,
      // songName: props.name,
      // singer: props.singer,
      // genre: props.genre,
      // releasedYear: props.releasedYear
    }
    navigate('EditSong', { state: params });
  }

  const deleteSong = () => {
    console.log(props.id);
    let sId= props.id;
    const apiUrl = "http://localhost:52793/api/Songs"
    fetch(apiUrl + `/${sId}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    }).then(
      (res) => {
        if (!res.ok) {
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong",
          });
        }
      },
      (error) => {
        console.log("err delete=", error);
      }
    );
  };
  return (
    <div className='container'>
      <div className="card">
        <h4>Song Name : {props.songName}</h4>
        <h5>Singer : {props.singer}</h5>
        <h5>Released year : {props.releasedYear}</h5>
        <h5>Genre : {props.genre}</h5>
        {/* onClick={() => navigate(`/EditSong/${props.id}`)}  */}
        <Button onClick={navigateTo} variant="contained">Edit Song</Button> 
        <Button onClick={() => deleteSong()} variant="contained">Delete Song</Button>
      </div>
    </div>
  )
}
