import React from "react";
import { Link } from "react-router-dom";

function Header(){
  return (
    <React.Fragment>
      <h1>The Flash</h1>
      <h2>Flashcards by The H.A.K.ers</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signin"> Sign In</Link>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default Header;