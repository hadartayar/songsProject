import React from "react";
import "./style.css";

export default function Header(props) {
  return (
    <div>
      <h1 className="title">
        <u>{props.text}</u>
      </h1>
    </div>
  );
}
