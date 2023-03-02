import React from "react";
import './App.css';
import HomePage from "./Components/HomePage";
import InsertSong from "./Components/InsertSong";
import EditSong from "./Components/EditSong";
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";

function App() {

  return (
      <Router>
        <nav>
        <Link to="/"> Home </Link><br/>
        <Link to="/InsertSong"> InsertSong </Link>
        {/* <Link to="/EditSong"> EditSong </Link> */}
      </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/InsertSong" element={<InsertSong />} />
          <Route path="/EditSong" element={<EditSong />} />
        </Routes>
      </Router>
  );
}

export default App;
