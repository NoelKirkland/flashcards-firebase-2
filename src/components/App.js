import React from "react";
import AppControl from "./AppControl";
import Header from "./Header";
import Signin from "./Signin";
import Logout from "./Logout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App(){
  return ( 
    <Router>
        <Switch>
          <Route path='/signin'>
            <Signin />
          </Route>
          <Route path='/logout'>
              <Logout />
          </Route>
          <Route path='/'>
              <AppControl />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;