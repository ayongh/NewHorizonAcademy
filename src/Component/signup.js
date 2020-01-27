import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Icon } from 'react-icons-kit'
import {close} from 'react-icons-kit/fa/close'

var validator = require("email-validator");



export default class signup extends Component 
{
    //Constructor
    constructor(prop)
    {
        super(prop)

        this.state = {
            firstName:'',              //User First Name
            lastName:'',               //User Last Name
            email:'',                  //User Email 
            password:'',               //User Password
            SecPassword:'',            //User password validation

            error:null,                 //Server error
             
            redirectLogin: false        //Page Redirected
        }
    }
   

    componentDidMount()
    {
        this.validateToken()
    }
    
    //Stores the value
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })

    }
    
    submit = (e)=>
    {
        e.preventDefault();

        //First Name validation
        if(this.state.firstName === "")
        {
            document.getElementById('firstName').style.borderColor = "red";
            document.getElementById('firstName').style.borderWidth = "1px";
        }
        else
        {
            document.getElementById('firstName').style.borderColor = "black";
            document.getElementById('firstName').style.borderWidth = "1px";
        }

        //Last Name Validation
        if(this.state.lastName === "")
        {
            document.getElementById('lastName').style.borderColor = "red";
            document.getElementById('lastName').style.borderWidth = "1px";
        }
        else
        {
            document.getElementById('lastName').style.borderColor = "black";
            document.getElementById('lastName').style.borderWidth = "1px";
        }

        //Email validation
        if(this.state.email === "" || validator.validate(this.state.email) === false)
        {
            document.getElementById('email').style.borderColor = "red";
            document.getElementById('email').style.borderWidth = "1px";
        }
        else
        {
            document.getElementById('email').style.borderColor = "black";
            document.getElementById('email').style.borderWidth = "1px"; 
        }

        //password validation
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


        //Secound Password validation
        if(this.state.SecPassword === "" || this.state.password !== this.state.SecPassword)
        {
            document.getElementById('SecPassword').style.borderColor = "red";
            document.getElementById('SecPassword').style.borderWidth = "1px"; 
            if(this.state.password !== this.state.SecPassword && this.state.SecPassword !== "" && this.state.password !== "")
            {
                document.getElementById('secPass').style.display = "flex"
            }  
            else
            {
                document.getElementById('secPass').style.display = "none"
            }
           
        }
        else
        {
            document.getElementById('SecPassword').style.borderColor = "black";
            document.getElementById('SecPassword').style.borderWidth = "1px";
        }


        if(this.state.firstName !== "" && this.state.lastName !== "" && this.state.email !== "" && validator.validate(this.state.email) === true && this.state.password !== "" && this.state.SecPassword !== "" && this.state.password === this.state.SecPassword )
        {
            var data  = {
                "fname": this.state.firstName,
                "lname": this.state.lastName,
                "email" : this.state.email,
                "password": this.state.password
            }
            
            document.getElementById("error").style.display="none"
            
            //Calls the post method to retrive the token and validate username and password
            axios.post('https://nhaservertest.herokuapp.com/user/signup', data, {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{
                if (res.status === 200)
                {
                    //We Store the token in local storage as well
                    localStorage.setItem("authToken", res.data.token)

                    console.log(res.data.token)

                    this.setState({
                        redirectLogin: true
                    })
                }
                else if(res.status === 403)
                {
                    this.setState({
                        error: res.data.errors
                    })
                }
                else
                {
                    this.setState({
                        error: res.data
                    })
                }
            }). catch(err =>{
                //we change the login state to false is we have an error
                this.setState({
                    flagLogin: false,
                })
            })// catch error
            
        } 
        else
        {
            document.getElementById("error").style.display="flex"
        }//if
    }

    render() 
    {
        const errorMSG = this.state.error
        let errorMessage;
    

        if (errorMSG !== null)
        {
            errorMessage = errorMSG.map((ErrMSG, i)=>
                <p key={i} style={{color:"red", display:"flex"}}><Icon icon={close}></Icon>{ErrMSG.msg}</p>
            )
        }
        else
        {
            errorMessage = ''
        }

        if(this.state.redirectLogin === true)
        {
           return <Redirect to="/"></Redirect>
        }

        return (
            <div className="signup_body">
                <div className="signup_left">
                    <div className="signup_left_outer_container">
                        <h3>Sign In</h3>
                        <label>
                            If you already have a login credential please click login button to login
                        </label>

                        <a href="/">
                            <button type="button" className="signup btn">Login</button>
                        </a>
                    </div>
                </div>

                <div className="signup_right">
                    <div className="signup_right_outer_container">
                        <div className="signup_right_inner_container">
                            <h2>Sign Up</h2>
                            <form onSubmit={this.handleSubmit}>
                                <div className="signup_signup_right_inner_container_elem">
                                    <label>First Name</label>
                                    <input id="firstName" onChange={this.handleChange}  className="txt" type="text" placeholder="First Name" required></input>
                                </div>

                                <div className="signup_signup_right_inner_container_elem">
                                    <label>Last Name</label>
                                    <input id="lastName" onChange={this.handleChange} className="txt" type="text" placeholder="Last Name" required></input>
                                </div>

                                <div className="signup_signup_right_inner_container_elem">
                                    <label>Email</label>
                                    <input id="email" onChange={this.handleChange} className="txt" type="email" placeholder="something@gmail.com" required></input>
                                </div>
                                
                                <div className="signup_signup_right_inner_container_elem">
                                    <label>Password</label>
                                    <input id="password" onChange={this.handleChange} className="txt" type="password" placeholder="password" required></input>
                                </div>

                                <div className="signup_signup_right_inner_container_elem">
                                    <label>Retype Password</label>
                                    <input id="SecPassword" onChange={this.handleChange} className="txt" type="password" placeholder="password" required></input>
                                </div>

                                <p id="secPass" style={{display:"none", color:"red"}}><Icon icon={close}></Icon>  password doesn't match</p>
                                <p id="error" style={{display:"none", color:"red"}}><Icon icon={close}></Icon>Make sure red higlighted filed must be filled with correct text</p>
                                <div>
                                {errorMessage}
                                </div>
                                <button id="submit_btn" onClick={this.submit} className="btn" type="submit">signup</button>

                            </form>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}