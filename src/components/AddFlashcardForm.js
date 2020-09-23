import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase';

function AddFlashcardForm (props) {

  const firestore = useFirestore();

  function addFlashcardToFirestore(event) {
    event.preventDefault();
    props.onFlashcardCreation();
    return firestore.collection('flashcards').add(
      {
        term: event.target.term.value,
        definition: event.target.definition.value
      }
    );
  }

  return (
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler = {addFlashcardToFirestore}
        buttonText = "Add Flashcard" />
    </React.Fragment>
  );
}

AddFlashcardForm.propTypes = {
  onFlashcardCreation: PropTypes.func
}

export default AddFlashcardForm;