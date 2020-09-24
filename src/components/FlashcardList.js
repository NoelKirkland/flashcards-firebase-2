import React, { useState } from "react";
import PropTypes from "prop-types";
import Flashcard from "./Flashcard";
import { useFirestoreConnect, isLoaded, useFirestore } from 'react-redux-firebase'
import firebase from "firebase/app";


function FlashcardList (props) {

  useFirestoreConnect([
    { collection: 'flashcards'}
  ]);

  const [queryData, setQueryData] = useState(null);

  const user = firebase.auth().currentUser;
  const firestore = useFirestore();

  function getUserFlashcards () { 
    firestore.collection('flashcards').where('userId', '==', user.uid).get()
    .then(function(querySnapshot) {                                           // this is of query snap shot type and it is the return of out .get from above
      const result = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      }); 
      console.log(result);
      displayData(result);
    });
  } 

  function displayData(resultArray) {
    if (resultArray.length === 0) {
      setQueryData("error");
    }
    setQueryData(resultArray);
  }

  if (queryData === null) {
    return (
      <React.Fragment>
        <h1>Loading...</h1>
        {getUserFlashcards()} 
      </React.Fragment>
    )
    } else if (queryData === "error") {
      return (
      <React.Fragment>
        <h1>You have not added any flashcards.</h1>
        <button onClick={props.onAddFlashcardClick}>Add Flashcard</button>
      </React.Fragment>
      )
    } else {
    return (
      <React.Fragment>
        {queryData.map((flashcard) => {
          return <Flashcard
          whenDetailsClicked = {props.onFlashcardSelection}
          term={flashcard.term}
          definition={flashcard.definition}
          userId={flashcard.userId}
          id={flashcard.id}
          key={flashcard.id}/>
        })}
        <button onClick={props.onAddFlashcardClick}>Add Flashcard</button>
      </React.Fragment>
    )
  }
}

FlashcardList.propTypes = {
  onFlashcardSelection: PropTypes.func,
  onAddFlashcardClick: PropTypes.func
}

export default FlashcardList;








// Async Await Attempt

// const user = firebase.auth().currentUser;
// const firestore = useFirestore();

//   const getUserFlashcards = async () => {
//     const userFlashcards = await firestore.collection('flashcards').where('userId', '==', user.uid).get()
//     .then(function(querySnapshot) {
//       const result = querySnapshot.docs.map((doc) => {
//         return { ...doc.data(), id: doc.id }
//       }); 
//       console.log(result);
//       return(result);
//     });
//     console.log(userFlashcards);
//     return userFlashcards
//   };

//     const flashcards = getUserFlashcards();
//     console.log(flashcards);

//     if(isLoaded(flashcards)) {
//       return (
//         <React.Fragment>
//           {flashcards.map((flashcard) => {
//             return <Flashcard
//             whenDetailsClicked = {props.onFlashcardSelection}
//             term={flashcard.term}
//             definition={flashcard.definition}
//             userId={flashcard.userId}
//             id={flashcard.id}
//             key={flashcard.id}/>
//           })}
//           <button onClick={props.onAddFlashcardClick}>Add Flashcard</button>
//         </React.Fragment>
//       );
//     } else {
//       return (
//         <React.Fragment>
//           <h3>Loading flashcards...</h3>
//         </React.Fragment>
//       )
//     }