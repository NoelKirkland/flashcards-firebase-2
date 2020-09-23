import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase';

function EditFlashcardForm (props) {

  const firestore = useFirestore(); //this is importing a method, so the variable calls that method

  const { flashcard } = props;
  console.log(flashcard);
  function handleEditFlashcardFormSubmission(event) {
    event.preventDefault();
    props.onEditFlashcard();
    const propertiesToUpdate = {
      term: event.target.term.value,
      definition: event.target.definition.value
    }
    return firestore.update({collection: 'flashcards', doc: flashcard.id }, propertiesToUpdate)
  }

  return (
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler = {handleEditFlashcardFormSubmission}
        buttonText = "Update Flashcard" />
    </React.Fragment>
  );
}

EditFlashcardForm.propTypes = {
  onEditFlashcard: PropTypes.func
}

export default EditFlashcardForm;