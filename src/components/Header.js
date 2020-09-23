import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

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
          <Link to="/signin"> Sign In</Link>
        </ParagraphStyles>
        <ParagraphStyles>
          <Link to="/logout"> Log Out</Link>
        </ParagraphStyles>
      </HeaderGrid>
      <hr/>
    </React.Fragment>
  );
}

export default Header;