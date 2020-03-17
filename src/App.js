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
import './Component/CSS/userprofile.css'

import Login from './Component/login';
import Signup from './Component/signup';
import PasswordReset from './Component/pswd_reset';
import Filenotfound from './Component/fileNotfound';
import UserID from './Component/pswd_userID';
import SearchHome from './Component/serachHome';
import Main_Browse_Show from './Component/main_browse_Show';
import Loading from './Component/loading';
import NoInternet from './Component/noInternet';
import UserProfile from './Component/userprofile'


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


//protected
const ProtectedRouteSignup = ({ component: Comp, loggedIn,validlogin, path, ...rest }) => {
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
          return <Redirect to={{pathname: "/", state: {prevLocation: path, error: "You need to login first!"}}}/>
        }//else
        
      }} //render
    /> //Route
  )
}

class App extends Component
{
  constructor(props)
  {
    super(props)
  }
  
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

            <Route  exact path="/pswdreset" component={UserID}/>
            <ProtectedRoute  exact path="/pswdreset/NewPswd" loggedIn={this.props.state.loginFlag} component={PasswordReset}/>         
      

            <Route  exact path="/" component={Login}/>
            <ProtectedRoute exact path="/browse/:genre" loggedIn={this.props.state.login.loginFlag} component={Main_Browse_Show}/>
            <ProtectedRoute exact path="/Homepage" loggedIn={this.props.state.login.loginFlag} component={SearchHome}/>
            <ProtectedRoute exact path="/profile" loggedIn={this.props.state.login.loginFlag} component={UserProfile}/>

            <Route exact path="/noIternet" component={NoInternet}/> 
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
