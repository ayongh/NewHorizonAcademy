import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import { Icon } from 'react-icons-kit'
import {close} from 'react-icons-kit/fa/close'

export default class pswdConfirmation extends Component 
{
    _isMounted = false;

    constructor(prop)
    {
        super(prop)

        this.state = {
            confirmationCode:'',
            error:null,
            modelopen:false,
            redirectpreviousPage: false,

            open: false,
             
            redirectNextPage: false,

            minute:4,
            sec:60
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false, redirectpreviousPage:true});
    };

    //Stores the value
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })

    }
    
    submit = (e)=>
    {
        e.preventDefault();
        console.log(this.state)

        if(this.state.userName === "")
        {
            document.getElementById('confirmationCode').style.borderColor = "red";
            document.getElementById('confirmationCode').style.borderWidth = "1px";
        }
        else
        {
            document.getElementById('confirmationCode').style.borderColor = "black";
            document.getElementById('confirmationCode').style.borderWidth = "1px";
        }

        if(this.state.userName !== "")
        {
            var data = {
                "authCode": this.state.confirmationCode
            }

            //Calls the post method to retrive the token and validate username and password
            axios.post('https://nhaservertest.herokuapp.com/user/pswdReset/confirmation', data, {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{
                if(res.status === 200)
                {
                   this.setState({
                     redirectNextPage: true
                   })
                }
                else if(res.status === 404)
                {
                    this.setState({
                        error: res.data.error
                    })
                }
                else
                {
                    this.onOpenModal()
                }

            }). catch(err =>{
                //we change the login state to false is we have an error
                this.setState({
                    error: "Internal Error occured"
                })
            })// catch error

        }        
        
    }

    componentDidMount() {
        this.countdown()
    }

    countdown()
    {
        this._isMounted = true;

        if(this._isMounted)
        {

            // update every second     
            setInterval(() => {
                if(this.state.minute >= 1 || this.state.sec >= 1)
                {
                    if(this.state.sec <=0 )
                    {
                        if(this._isMounted)
                        {
                            this.setState({
                                sec:60,
                                minute: this.state.minute -1
                            })
                        }
                    }

                    if(this._isMounted)
                    {
                        this.setState({
                            sec: this.state.sec - 1
                        })
                    }
                    
                }
                else
                {
                    if(this._isMounted)
                    {
                        this.onOpenModal()
                    }
                }
            }, 1000);
        }
    }

    componentWillUnmount()
    {
        this._isMounted = false;
    }

    render() 
    {
        const { open } = this.state;

        if(this.state.redirectpreviousPage === true)
        {
            return <Redirect to="/userid"></Redirect>
        }
        
        if(this.state.redirectNextPage === true)
        {
            return <Redirect to="/passwordrest"></Redirect>
        }

        const Notfounderr = this.state.error ;
        let err;
        if( Notfounderr !== null)
        {
            err = <p style={{color:"red", display:"flex"}}><Icon icon={close}></Icon>{Notfounderr}</p>
        }
        else
        {
            err = ''
        }


        
        return (
            <div className="signup_body">
                <div className="login_left passwordReset">
                    <div className="login_left_outer_container">
                        <h3>Warning</h3>
                        <p>The code sent to your email will expire in </p>

                        <div className="Countdown">
                            <span className="Countdown-col">
                                <span className="Countdown-col-element">
                                    <h1>{this.state.minute}</h1>
                                    <span>Min</span>
                                </span>
                            </span>

                            <span className="Countdown-col">
                                <span className="Countdown-col-element">
                                    <h1>{this.state.sec}</h1>
                                    <span>Sec</span>
                                </span>
                            </span>

                        </div>
                    </div>
                </div>

                <div className="signup_right">
                    <div className="signup_right_outer_container">
                        <div className="signup_right_inner_container">
                            <h2>Authentication Confirmation</h2>

                            <div className="signup_signup_right_inner_container_elem">
                                <label>New Password</label>
                                <input id="confirmationCode"  onChange={this.handleChange} className="txt" type="text" placeholder="a1zk22"></input>
                            </div>

                            {err}
                            <button id="submit_btn" onClick={this.submit} className="btn" type="submit">Confirm</button>

                            <p> Login now <a href="\">Login</a></p>
                        </div>
                    </div>
                    
                </div>

                <Modal open={open} onClose={this.onCloseModal} center style={{color:"red", textAlign:"center"}}>
                    <h2 style={{color:"red", width:"100%", textAlign:"center"}}>Code Expired</h2>
                    <p style={{color:"red", width:"100%", textAlign:"center"}}><Icon icon={close}></Icon>The code sent to your email has expired please restart again</p>
                </Modal>

            </div>
        )
    }
}