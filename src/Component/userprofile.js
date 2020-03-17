import React, { Component } from 'react'
import {Link } from 'react-router-dom'

class userprofile extends Component 
{
    constructor(prop)
    {
        super(prop)
        this.state = {
            firstName:'',              //User First Name
            lastName:'',               //User Last Name
            email:'',                  //User Email        
        }
    }

    render() 
    {
        return (
          <div className="userprofile_main_container">
                <div className="user_info_container">
                    <Link to="/">Home</Link>
                  <h3> Account</h3>
                  <div className="userinfo_wrapper">
                    <div className="userinfo_title">
                        <p className="subTitle">User info</p>
                    </div>
                    <div className="userinfo_detail">
                        <p className="Name">Abhishek Yonghang</p>
                        <p className="subIdentifier">ayongh1@gmail.com</p>
                        <p className="subIdentifier">password : *********</p>
                    </div>
                    <div className="userinfo_detail_changeDetail">
                        <Link to=""><p className="subIdentifier">Change Name</p></Link>
                        <Link to=""><p className="subIdentifier">Change Email</p></Link>
                        <Link to=""><p className="subIdentifier">Change Password</p></Link>
                    </div>
                  </div>
                  
                </div>
          </div>
        )
    }
}

export default userprofile