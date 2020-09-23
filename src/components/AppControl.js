import React from 'react';
import AddFlashcardForm from './AddFlashcardForm';
import FlashcardList from './FlashcardList';
import FlashcardDetails from './FlashcardDetails';
import EditFlashcardForm from './EditFlashcardForm';
import Header from './Header';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { withFirestore, isLoaded } from 'react-redux-firebase'

class AppControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedFlashcard: null,
      visibleOnPage: "flashcardList" // set default state to showing the flashcardList because it will trigger the else statement in the render method
      }
    };

    handleAddClick = () => { 
      this.setState({visibleOnPage: "addFlashcard"})
    }

    handleAddingFlashcard = () => {
      this.setState({
        visibleOnPage: "flashcardList"
      });
    }

    handleDeletingFlashcard = (id) => {
      this.props.firestore.delete({collection: 'flashcards', doc: id});
      this.setState({selectedFlashcard: null});
    }

    handleChangingSelectedFlashcard = (id) => { // pass flashcard id
      this.props.firestore.get({collection: 'flashcards', doc: id}).then((flashcard) => { //grab the flashcard with that id from the firestore collection, then pass that flashcard as a parameter
        const firestoreFlashcard = { // create variable
          term: flashcard.get("term"), // grab the values to these properties
          definition: flashcard.get("definition"),
          id: flashcard.id
        }
        this.setState({selectedFlashcard: firestoreFlashcard}); // set the state to the selected flash card with those new properties
      });
    }
    
    handleEditClick = () => { // this method is called on when the user clicks the edit button in details
      this.setState({visibleOnPage: 'editing'}); // this triggers the if statement in the render to show the editflashcard form
    }

    handleEditingFlashcard = () => {
      this.setState({
        visibleOnPage: "flashcardList",
        selectedFlashcard: null
      });
    }

    render(){
      const auth = this.props.firebase.auth(); 
      if (!isLoaded(auth)) {
        return (
          <React.Fragment>
            <h1>Loading...</h1>
          </React.Fragment>
        )
      }
      if ((isLoaded(auth)) && (auth.currentUser == null)) {
        return (
          <React.Fragment>
            <Header /> 
            <h1>You must be signed in to access the queue.</h1>
          </React.Fragment>
        )
      } 

      if ((isLoaded(auth)) && (auth.currentUser != null)) {

        let currentlyVisibleState = null;
        if (this.state.visibleOnPage === "editing") { // if we are editing then show the edit flashcard form
          currentlyVisibleState = <EditFlashcardForm flashcard = {this.state.selectedFlashcard} onEditFlashcard = {this.handleEditingFlashcard} />
        } else if (this.state.selectedFlashcard != null) { // if the selected flashcard is not empty, then show the selected flashcard's detail page
          currentlyVisibleState = <FlashcardDetails flashcard = {this.state.selectedFlashcard} onClickingDelete = {this.handleDeletingFlashcard} onClickingEdit = {this.handleEditClick} />
        } else if (this.state.visibleOnPage === "addFlashcard") { // 
          currentlyVisibleState = <AddFlashcardForm onFlashcardCreation = {this.handleAddingFlashcard} />
        } else { // otherwise show the list of flashcards
          currentlyVisibleState = <FlashcardList onFlashcardSelection = {this.handleChangingSelectedFlashcard} onAddFlashcardClick = {this.handleAddClick} />
        }
        return (
          <React.Fragment>
            <Header /> 
            {currentlyVisibleState}
          </React.Fragment>
        );
      }
    }
}

export default withFirestore(AppControl);