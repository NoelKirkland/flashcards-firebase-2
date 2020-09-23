import React, { useState } from "react";
import firebase from "firebase/app";
import Header from './Header';

function Logout() {

  const [loggedIn, setLoggedIn] = useState(true)

  function doSignOut() {
    firebase.auth().signOut().then(function() {
      console.log("Signed out!");
      setLoggedIn(false);
    }).catch(function(error) {
      alert(error.message) ;
    });
  }

  
    return (
      <React.Fragment>
        <Header /> 
        <h1>Sign Out</h1>
        {loggedIn ? <button onClick={doSignOut}>Sign out</button> : <h4>You have successfully signed out!</h4>}
      </React.Fragment>
    )
}

export default Logout;
