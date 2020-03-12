import React, { Component } from 'react'
import Recaptcha from 'react-google-invisible-recaptcha';
import MainComponent from './sidemenu'
import { Icon } from 'react-icons-kit'
import {close} from 'react-icons-kit/fa/close'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {Actionlogin, ActionLoading, ActionError} from '../Action/loginAction'
import {loginDispatch} from '../DispatchAction/loginDispatch'

import Loading from './loading'

class login extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            username:null,
            password:null,
            userError: null,

            value: '' 
            
        }
        this.onResolved = this.onResolved.bind( this );

    }
    

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    handleSubmit = (e)=>
    {
        e.preventDefault();
        
        if(this.state.username !== null && this.state.password !==null)
        {
            this.setState({
                userError:null
            })
            this.recaptcha.execute();
        }
        else
        {
            this.setState(
                {
                    userError:"please make sure USERNAME and PASSWORD is filled"
                }
            )
            this.recaptcha.reset();

        }

    }

    //When recaptcha is resolved
    onResolved() {
        const data = {
            email:this.state.username,
            password:this.state.password,
            token:this.recaptcha.getResponse()
        }

        loginDispatch(data, this.props)
    }

    render()
    {
        //Checks error and display it errorElement
        let errorElement = this.state.userError
        
        if(this.state.userError !== null)
        {
            errorElement = <p style={{color:"red", display:"flex"}}><Icon icon={close}></Icon>{this.state.userError}</p>
        }

        if(this.props.state.login.error)
        {
            errorElement = <p style={{color:"red", display:"flex"}}><Icon icon={close}></Icon>{this.props.state.login.error}</p>
        }

        const route = this.props.location.state
       
        if(this.props.state.login.loginFlag)
        {
            if(route !== undefined)
            {
                return <Redirect to= {route.prevLocation}/>
            }
            else
            {
                return <Redirect to= "/Homepage"/>
            }   
        }
            

        return (
            <div className="login_body">
                <div className="login_left">
                    <div className="login_left_outer_container">
                        <h3>Create New User</h3>
                        <label>If you dont have a user name and password created please 
                            do so now by clicking the button below. Thank you!
                        </label>
                        <Link to={"/signup"}>
                            <button type="button" className="signup btn" href="/signup">Sign up</button>
                        </Link>
                    </div>
                </div>
                <div className="login_right">
                    <div className="login_right_outer_container">
                        <div className="login_right_inner_container">
                            <h2>Login</h2>
    
                            <form onSubmit={this.handleSubmit}>
                                <div className="login_login_right_inner_container_elem">
                                    <label className="login_label">User Name</label>
                                    <input id="username" onChange={this.handleChange}  className="txt" type="text" placeholder="User Name"></input>
                                </div>
                                
                                <div className="login_login_right_inner_container_elem">
                                    <label className="login_label">password</label>
                                    <input id="password" onChange={this.handleChange}  className="txt" type="password" placeholder="password"></input>
                                </div>
                                {errorElement}
                                <button id="submit_btn" className="btn" type="submit">Login</button>
                            </form>
                            
                            <p> I forgot my <Link to={"/pswdreset"}>password</Link></p>
                        </div>
                    </div>
                    
                </div>
                <Recaptcha
                ref={ ref => this.recaptcha = ref }
                //**************************************************DANGER remove site key to saftey *********************************************************************
                sitekey="6LdhWNsUAAAAAKIeVaOGdY3HCKy5Siva9emmZDl6"
                onResolved={ this.onResolved } />
            </div>
        )//return
    }  
}

//access all the state
const mapToState = (state) =>{
    return {
        state:state
    }
}

export default connect(mapToState,{Actionlogin,ActionLoading,ActionError}) (login);
