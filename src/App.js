import React, { Component } from 'react';
import './App.css';
import './Component/CSS/login.css';
import './Component/CSS/signup.css';
import './Component/CSS/searchHome.css';
import './Component/CSS/pswd_rest.css';


import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from "react-router-dom";
import Login from './Component/login';
import Signup from './Component/signup';
import PasswordReset from './Component/pswd_reset';
import Filenotfound from './Component/fileNotfound';
import UserID from './Component/pswd_userID';
import SearchHome from './Component/serachHome';
import PaswdConfirmation from './Component/pswdConfirmation';
import SignupEmailValidation from './Component/signupEmailValidation'
import Browse from './Component/browse'

//protected
const ProtectedRoute = ({ component: Comp, loggedIn,validlogin, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {

        if(loggedIn)
        {
          return <Comp {...props}/>
        }
        else
        {
          if(path=== "/pswdreset/NewPswd" || path==="/pswdreset/ConfirmationCode")
          {
            return <Redirect to={{pathname: "/pswdreset", state: {prevLocation: path, error: "You need to login first!"}}}/>
          }
          else if(path === "/signup/emailValidation")
          {
            return <Redirect to={{pathname: "/signup", state: {prevLocation: path, error: "You need to login first!"}}}/>
          }

          return <Redirect to={{pathname: "/", state: {prevLocation: path, error: "You need to login first!"}}}/>
        }//else
        
      }} //render
    /> //Route
  )
}

class App extends Component
{

  state = {
    loggedIn: false,
  };

  

  render()
  {
    return (
      
      <Switch>

        <Route exact path="/signup" component={Signup}/>
        
        <ProtectedRoute exact path="/signup/emailValidation" loggedIn={this.state.loggedIn} component={SignupEmailValidation}/>


        <Route  exact path="/pswdreset" component={UserID}/>

        <ProtectedRoute  exact path="/pswdreset/NewPswd" loggedIn={this.state.loggedIn} component={PasswordReset}/>
        
        <ProtectedRoute  exact path="/pswdreset/ConfirmationCode" loggedIn={this.state.loggedIn} component={PaswdConfirmation}/>
  


        <Route  exact path="/" component={Login}/>

        <ProtectedRoute exact path="/browse" loggedIn={this.state.loggedIn} component={Browse}/>

        <ProtectedRoute exact path="/Homepage" loggedIn={this.state.loggedIn} component={SearchHome}/>


        <Route>
          <Filenotfound/>
        </Route>
      
      </Switch>
    );
  }
}

export default App;
