import React, { Component } from 'react'
import {Link } from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import {API_URL} from '../globalVariable'
import {ActionUserUpdateName, ActionUserError} from '../Action/userinfoAction'


class update_username extends Component 
{
    constructor(props)
    {
        super(props)
        this.state = {
            firstName:'',              //User First Name
            lastName:'',               //User Last Name
            error:undefined
        }
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit= (e)=>
    {
        e.preventDefault();

        if(document.getElementById('firstName').value !== '' && document.getElementById('lastName').value !== '')
        {
            if(document.getElementById('firstName').value !== this.props.state.userInfo.FirstName || document.getElementById('lastName').value !== this.props.state.userInfo.LastName)
            {
                var payload = {
                    'fname':document.getElementById('firstName').value,
                    'lname':document.getElementById('lastName').value
                }

                axios.post(API_URL+'/user/info/update/name', payload, {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>
                {
                    console.log(res)
                    if(res.status === 200)
                    {
                        console.log(res.data)
                        this.props.ActionUserUpdateName(res.data.message)
                    }
                    else
                    {
                        this.props.ActionUserError(res.data.error)
                    }
                })     

            }
        }
        else{
            this.setState({
                error:'First or last name cannont be empty'
            })
        }
   


    }

    render() 
    {
        let errorElement;
        if (this.state.error !== undefined)
        {
        errorElement = <p>{this.state.error}</p>
        }

        return (
          <div className="userprofile_main_container">
                <div className="user_info_container">
                    <Link to="/profile">Profile</Link>
                  <h3> Update</h3>
                    <div className="userinfo_wrapper">
                        <div className="userinfo_title">
                            <p className="subTitle">User info</p>
                        </div>
                        <div className="update_userinfo_detail">
                            <form onSubmit={this.handleSubmit} className="updateform">
                                <p className="update_subIdentifier">First Name</p>
                                <input id= "firstName" className="updateText" type="text" onChange={this.handleChange} defaultValue ={this.props.state.userInfo.FirstName}></input>
                                
                                <p className="update_subIdentifier"> Last Name</p>
                                <input id= "lastName" className="updateText" type="text" onChange={this.handleChange} defaultValue ={this.props.state.userInfo.LastName}></input>
                                <p className="update_subIdentifier"></p>

                                {errorElement}
                                <button className="updateButton" onClick={this.update}>update</button>

                            </form>
                           
                        </div>
                    </div>
                </div>
          </div>
        )
    }
}


//access all the state
const mapToState = (state) =>{
    return {
        state:state
    }
}

export default connect(mapToState,{ActionUserUpdateName,ActionUserError}) (update_username)