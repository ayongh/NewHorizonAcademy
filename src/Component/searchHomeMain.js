import React, { Component } from 'react'
import axios from 'axios'
import {Redirect, Link} from "react-router-dom";

export default class searchHomeMain extends Component 
{
    constructor(prop)
    {
        super(prop)
        this.state=
        {

        }
    }
    render() 
    {
        return (

        <div className="search_home_main_container">
            <div className="search_home_main_header">

                <div className="search_home_main_header_left">
                    <h2>Gardian Of The Galaxie</h2>
                    <div className="main_header_left_content">
                        <p>This is the content of the video</p>
                    </div>
                    <button className="main_header_left_button">+  My List</button>
                </div>
            </div>

            <div className="search_home_main_header_small">
                <div className="header_small_left">
                    <h2>Gardian Of The Galaxie</h2>
                </div>

                <div className="header_small_middle">
                    <h2>Gardian Of The Galaxie</h2>          
                </div>

                <div className="header_small_left">
                    <h2>Gardian Of The Galaxie</h2>
                </div>
            </div>

            <div className="search_home_main_header_small secound_content">
                <div className="header_small_left middle_content">
                    <h2>Gardian Of The Galaxie</h2>
                </div>

                <div className="header_small_left middle_content">
                    <h2>Gardian Of The Galaxie</h2>
                </div>

                <div className="header_small_left middle_content">
                    <h2>Gardian Of The Galaxie</h2>
                </div>

                <div className="header_small_left">
                    <h2>Gardian Of The Galaxie</h2>

                </div>
            </div>

            <div className="search_home_main_header_small secound_content">
                <div className="header_small_left middle_content">
                    <h2>Gardian Of The Galaxie</h2>
                </div>

                <div className="header_small_left middle_content">
                    <h2>Gardian Of The Galaxie</h2>
                </div>

                <div className="header_small_left middle_content">
                    <h2>Gardian Of The Galaxie</h2>
                </div>

                <div className="header_small_left">
                    <h2>Gardian Of The Galaxie</h2>

                </div>
            </div>
        
        </div>

               
        )
    }
}
