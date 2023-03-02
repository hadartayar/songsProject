import React from 'react'
import Song from './Song';
import "./style.css";

export default function SongsContainer(props) {
  if (props.songs == null)
    return <div></div>


  const songs = props.songs.map((s) =>
    <Song
      key={s.Id}
      id={s.Id}
      songName={s.Name}
      singer={s.Singer}
      releasedYear={s.ReleasedYear}
      genre={s.Genre}
    />)

  return (
    <div>
      {songs}
    </div>
  )
}
