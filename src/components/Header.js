import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import firebase from "firebase/app";

const FlashcardHeader = styled.h1`
  font-size: 36px;
  text-align: center;
  color: red;
  `;

const HeaderGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr 1fr 1fr 1fr;
  grid-template-rows: 15vh;
  // background-color: blue;
`;

const ParagraphStyles = styled.p`
  display: inline;
`;

function Header(){

  const auth = firebase.auth(); // variable auth is called in the if statement, not the auth method of firebase
  let currentlyVisibleLink = null;
  if (auth.currentUser != null) {
    currentlyVisibleLink = <Link to="/logout"> Log Out</Link>
  } else {
    currentlyVisibleLink = <Link to="/signin"> Sign In</Link>
  }

  return (
    <React.Fragment>
      <HeaderGrid>
        <FlashcardHeader>
          The Flash
        </FlashcardHeader>
        <h2>Flashcards by The H.A.K.ers</h2>
        <ParagraphStyles>
            <Link to="/">Home</Link>
        </ParagraphStyles>
        <ParagraphStyles>
          {currentlyVisibleLink}
        </ParagraphStyles>
      </HeaderGrid>
      <hr/>
    </React.Fragment>
  );
}

export default Header;