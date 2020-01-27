import React from 'react';
import './App.css';
import './Component/CSS/login.css';
import './Component/CSS/signup.css';
import './Component/CSS/searchHome.css';
import './Component/CSS/pswd_rest.css';


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Component/login';
import Signup from './Component/signup';
import PasswordReset from './Component/pswd_reset';
import Filenotfound from './Component/fileNotfound';
import UserID from './Component/pswd_userID';
import SearchHome from './Component/serachHome';
import Browse from './Component/browse';
import PaswdConfirmation from './Component/pswdConfirmation';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/signup">
            <Signup>Signup</Signup>
          </Route>

          <Route  exact path="/passwordrest">
            <PasswordReset/>
          </Route>

          <Route  exact path="/passwordConfirmation">
            <PaswdConfirmation/>
          </Route>

          <Route  exact path="/search">
            <SearchHome/>
          </Route>

          <Route  exact path="/browse">
            <Browse/>
          </Route>

          <Route  exact path="/userid">
            <UserID/>
          </Route>

          <Route exact path="/">
            <Login>Hello</Login>
          </Route>

          <Route exact>
            <Filenotfound/>
          </Route>
       
        </Switch>
      </div>
      
    </Router>
  );
}

export default App;
