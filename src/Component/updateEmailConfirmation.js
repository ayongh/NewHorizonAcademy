import React, { Component } from 'react'
import {Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import {API_URL} from '../globalVariable'
import {ActionUserUpdateEmail, ActionUserError} from '../Action/userinfoAction'

class updateProfileEmail extends Component 
{
    constructor(prop)
    {
        super(prop)
        this.state = {
            validationCode:'',
            error:null,
            redirectNextPage:false
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

        if(document.getElementById('validationCode').value !== '')
        {
            var payload = {
                'validationCode':document.getElementById('validationCode').value
            }

            axios.post(API_URL+'/user/info/update/emailValidation', payload, {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>
            {
                if(res.status === 200)
                {
                    this.props.ActionUserUpdateEmail(res.data.message)
                    this.setState({
                        redirectNextPage:true
                    })
                }
                else
                {
                    this.setState({
                        error:res.data.error
                    })
                }

            }).catch(error => {
                this.setState({
                    error:"error occured when making a request"
                })
            })
        }
    }

    render() 
    {

        if(this.state.redirectNextPage)
        {
            return <Redirect to='/profile'/>
        }

        let errorElement = null
        if(this.state.error)
        {
            errorElement = <p>{this.state.error}</p>
        }
        return (
          <div className="userprofile_main_container">
                <div className="user_info_container">
                    <Link to="/profile">Profile</Link>
                  <h3> Email Validation</h3>
                    <div className="userinfo_wrapper">
                        <div className="userinfo_title">
                            <p className="subTitle">Validation</p>
                        </div>
                        <div className="update_userinfo_detail">
                            <form onSubmit={this.handleSubmit} className="updateform">
                                <p className="update_subIdentifier">Validation Code</p>
                                <input id='validationCode' className="updateText" onChange={this.handleChange} type="text" />
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

export default connect(mapToState, {ActionUserUpdateEmail, ActionUserError}) (updateProfileEmail)