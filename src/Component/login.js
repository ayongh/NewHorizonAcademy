import React, { Component } from 'react'
import axios from 'axios'
import MainComponent from './sidemenu'
import { Icon } from 'react-icons-kit'
import {close} from 'react-icons-kit/fa/close'
import Loading from './loading'

export default class Login extends Component 
{

    constructor(prop)
    {
        super(prop)
        this.state = {
            username:'',
            password:'',
            loading:true,

            flagLogin:false,
            error:null
        }//state
    }//constructor
   
    //Stores the value when change in inpute filed occures
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })

    }

    //Validates the user name and passowrd and provides with token to login
    handleSubmit= (e) =>
    {
        e.preventDefault();

        this.formValidation()

        if(this.state.password !== null && this.state.username !== null)
        {
            var data = {
                "email":this.state.username,
                "password":this.state.password
            }

            //Calls the post method to retrive the token and validate username and password
            axios.post('http://localhost:3001/user/login', data, {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{

                if(res.status === 200)
                {
                    //We Store the token in local storage as well
                    localStorage.setItem("authToken", res.data.token)

                    //We also Change the logins state to true
                    this.setState({
                        flagLogin: true,
                    })
                }
                else 
                {
                    if(res.status === 403)
                    {
                        this.setState({
                            flagLogin: false,
                            error: res.data.errors
                        })
                    }
                    else if(res.status === 404)
                    {
                        this.setState({
                            flagLogin: false,
                            error: res.data.message
                        })
                    }
                    
                }//else

            }).catch(err =>{
                //we change the login state to false is we have an error
                this.setState({
                    flagLogin: false,
                    error:"internal Error occure"
                }) //state
            })//catch     

        }//if

    }//handleSubmit

    formValidation()
    {
        
        if(this.state.username === "")
        {
            document.getElementById('username').style.borderColor = "red";
            document.getElementById('username').style.borderWidth = "1px";
        }
        else
        {
            document.getElementById('username').style.borderColor = "black";
            document.getElementById('username').style.borderWidth = "1px";
        }

        if(this.state.password === "")
        {
            document.getElementById('password').style.borderColor = "red";
            document.getElementById('password').style.borderWidth = "1px";
        }
        else
        {
            document.getElementById('password').style.borderColor = "black";
            document.getElementById('password').style.borderWidth = "1px";
        }

    }//formValidation

    render() 
    {
        
        const error = this.state.error
        let errorAlert;

        if(error !== null)
        {
            errorAlert = <p style={{color:"red"}}> <Icon icon={close}></Icon>{error}</p>
        }

        
        return (

            <div className="login_body">
                <div className="login_left">
                    <div className="login_left_outer_container">
                        <h3>Create New User</h3>
                        <label>If you dont have a user name and password created please 
                            do so now by clicking the button below. Thank you!
                        </label>
                        <a href="/signup">
                            <button type="button" className="signup btn" href="/signup">Sign up</button>
                        </a>
                    </div>
                </div>

                <div className="login_right">
                    <div className="login_right_outer_container">
                        <div className="login_right_inner_container">
                            <h2>Login</h2>

                            <form onSubmit={this.handleSubmit}>
                                <div className="login_login_right_inner_container_elem">
                                    <label className="login_label">User Name</label>
                                    <input id="username" onChange={this.handleChange} className="txt" type="text" placeholder="User Name"></input>
                                </div>
                                
                                <div className="login_login_right_inner_container_elem">
                                    <label className="login_label">password</label>
                                    <input id="password" onChange={this.handleChange} className="txt" type="password" placeholder="password"></input>
                                </div>
                                {errorAlert}
                                <button id="submit_btn" className="btn" type="submit">Login</button>
                            </form>
                            
                            <p> I forgot my <a href="\userid">password</a></p>
                        </div>
                    </div>
                    
                </div>
            </div>
        )//return
    }
}