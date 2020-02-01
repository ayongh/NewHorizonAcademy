import React, { Component } from 'react'
import axios from 'axios'
import MainComponent from './sidemenu'
import { Icon } from 'react-icons-kit'
import {close} from 'react-icons-kit/fa/close'

export default class Login extends Component 
{

    constructor(prop)
    {
        super(prop)
        this.state = {
            username:'',
            password:'',
            flagLogin:false,
            count: 0,
            error:null
        }
    }
   

    componentDidMount()
    {
        const localToken =localStorage.getItem('authToken')
        if(localToken !== undefined)
        {
            this.validateToken()
        }
    }
    
    //Stores the value
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })

    }

    //Validates the user name and passowrd and provides with token to login
    handleSubmit= (e) =>
    {
        e.preventDefault();
        var data = {
            "email":this.state.username,
            "password":this.state.password
        }

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

        if(this.state.password !== null && this.state.username !== null)
        {
            //Calls the post method to retrive the token and validate username and password
            axios.post('https://nhaservertest.herokuapp.com/user/login', data, {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{

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

                    if(res.status === 404)
                    {
                        this.setState({
                            flagLogin: false,
                            error: res.data.message
                        })
                    }
                    
                }
            

            }).catch(err =>{
                //we change the login state to false is we have an error
                this.setState({
                    flagLogin: false,
                    error:"internal Error occure"
                })
            })
            

        }


      
    }

    //validates if the local token and cookie token is same and also checks if token has expired
    validateToken()
    {
        axios.post('https://nhaservertest.herokuapp.com/token/validation', {"localtoken":localStorage.getItem('authToken')}, {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{

            if(res.status === 200)
            {
                this.setState({
                    flagLogin: true,
                })
            }
            else
            {
                this.setState({
                    flagLogin: false,
                })
                
            }

           
        }).catch(err =>{
            this.setState({
                flagLogin: false,
            })
        })

    }

    render() 
    {
        
        const error = this.state.error
        let errorAlert;

        if(error !== null)
        {
            errorAlert = <p style={{color:"red"}}> <Icon icon={close}></Icon>{error}</p>
        }

        //if the token matches and validates the Main page is loaded
        if(this.state.flagLogin)
        {
            return <MainComponent/>
        }
        
        //if the token is invalid the login page is loaded
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
        )
    }
}