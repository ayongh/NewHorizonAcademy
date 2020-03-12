import React, { Component } from 'react';
import {Actionlogin, ActionLoading, ActionError} from './Action/loginAction'
import {authDispatch} from './DispatchAction/loginDispatch'
import {
  BrowserRouter,
  Redirect,
  Switch,
  Route
} from "react-router-dom";
import {connect} from 'react-redux'

import './App.css';
import './Component/CSS/login.css';
import './Component/CSS/signup.css';
import './Component/CSS/searchHome.css';
import './Component/CSS/pswd_rest.css';
import Login from './Component/login';
import Signup from './Component/signup';
import PasswordReset from './Component/pswd_reset';
import Filenotfound from './Component/fileNotfound';
import UserID from './Component/pswd_userID';
import SearchHome from './Component/serachHome';
import PaswdConfirmation from './Component/pswdConfirmation';
import SignupEmailValidation from './Component/signupEmailValidation'
import Browse from './Component/browse'
import Loading from './Component/loading'
import NoInternet from './Component/noInternet'


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
            return <Redirect to={{pathname: "/pswdreset", state: {prevLocation: path, route: "You need to login first!"}}}/>
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
  componentDidMount()
  {
    authDispatch(this.props)
  }

  render()
  {
    if(this.props.state.login.loading)
    {
      return <Loading/>
    }
    else
    {
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/noIternet" component={PaswdConfirmation}/>

            <ProtectedRoute exact path="/signup/emailValidation" loggedIn={this.props.state.loginFlag} component={SignupEmailValidation}/>


            <Route  exact path="/pswdreset" component={UserID}/>
            <ProtectedRoute  exact path="/pswdreset/NewPswd" loggedIn={this.props.state.loginFlag} component={PasswordReset}/>         
            <ProtectedRoute  exact path="/pswdreset/ConfirmationCode" loggedIn={this.props.state.loginFlag} component={PaswdConfirmation}/>
      

            <Route  exact path="/" component={Login}/>
            <ProtectedRoute exact path="/browse" loggedIn={this.props.state.login.loginFlag} component={Browse}/>
            <ProtectedRoute exact path="/Homepage" loggedIn={this.props.state.login.loginFlag} component={SearchHome}/>

            <Route component={Filenotfound}/>
          </Switch>
        </BrowserRouter>
      );
    }
  }
}

const mapToState = (state) =>{
  return {
    state:state
  }
}

export default connect(mapToState, {Actionlogin, ActionLoading, ActionError}) (App);
