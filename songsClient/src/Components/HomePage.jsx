import React, { useState, useEffect } from "react";
import SongsContainer from './SongsContainer';
import Header from './Header';
import "./style.css";

export default function HomePage() {
  const apiUrl = "http://localhost:52793/api/Songs";
  const [songs, setSongs] = useState(null);

  const getAllSongs = () => {
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
          console.log("fetch Songs= ", result);
          setSongs(result);
        },
        (error) => {
          console.log("err Get=", error);
        });
  }

  useEffect(getAllSongs, []);

  return (
    <div>
      <Header text={"Songs In The list:"} />
      <SongsContainer songs={songs} />
    </div>
  )
}
