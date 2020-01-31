import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Icon } from 'react-icons-kit'
import {close} from 'react-icons-kit/fa/close'



export default class signupEmailValidation extends Component 
{
    constructor(prop)
    {
        super(prop)

        this.state = {
            userVerificationCode:'',              //User inpute validation code
        
            error:null,                         //Server error

            singleServererror:'',

            Internalerror:'',
             
            redirectlogin: false                //Page Redirected
        }
    }

    //Stores the value
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })

    }

    //Validates the user name and passowrd and provides with token to login
    submit= (e) =>
    {
        e.preventDefault();
        this.formValidation();

        if(this.state.userVerificationCode !== '')
        {
            var data  = {
                "fname": this.props.firstName,
                "lname": this.props.lastName,
                "email" : this.props.email,
                "password": this.props.password,
                "hasedVerifedCode": this.props.validationCode,
                "userInputedCode":this.state.userVerificationCode
            }

            axios.post('https://nhaservertest.herokuapp.com/user/signup', data, {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{
                
                console.log(res.data)

                if(res.status === 200)
                {
                    localStorage.setItem("authToken", res.data.token)

                    this.setState({
                        redirectlogin:true
                    })

                }
                else if( res.status === 403)
                {
                    this.setState({
                        error: res.data.errors
                    })
                }
                else
                {
                    this.setState({
                        singleServererror: res.data.error
                    })
                }
               

           
            }).catch(err =>{
                this.setState({Internalerror:"There is Internal error that occured"})
            })
        }
        
    }

    formValidation()
    {
        if(this.state.userVerificationCode === '')
        {
            document.getElementById('userVerificationCode').style.borderColor = "red";
            document.getElementById('userVerificationCode').style.borderWidth = "1px";
            this.setState({
                internallerror: "Validation Code field cannot be empty"
            })
        }
        else
        {
            document.getElementById('userVerificationCode').style.borderColor = "black";
            document.getElementById('userVerificationCode').style.borderWidth = "1px";
        }
    }
    
    render() 
    {    
        if(this.state.redirectlogin === true)
        {
            return <Redirect to="/"/>
        }

        //multiple errors from server
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

        //single error from server
        const singleErrMsg = this.state.singleServererror
        let singleServerMessage;
        if(singleErrMsg !== '')
        {
            singleServerMessage = <p style={{color:"red", display:"flex"}}><Icon icon={close}></Icon>{singleErrMsg}</p>
        }

        //Single error internal 
        const singleInternalErrMsg = this.state.Internalerror
        let singleInternalErrorMessage;
        if(singleInternalErrMsg !== '')
        {
            singleInternalErrorMessage = <p style={{color:"red", display:"flex"}}><Icon icon={close}></Icon>{singleInternalErrMsg}</p>
        }

        return (
            <div className="signup_body">
                <div className="signup_left">
                    <div className="signup_left_outer_container">
                        <h3>Sign up Email validation</h3>
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
                                    <input id="userVerificationCode" onChange={this.handleChange}  className="txt" type="text" placeholder="AXCHE12V"></input>
                                </div>
                                {errorMessage}
                                {singleServerMessage}
                                {singleInternalErrorMessage}
                                <button id="submit_btn" onClick={this.submit} className="btn" type="submit">signup</button>

                            </form>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}