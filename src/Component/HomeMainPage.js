import React, { Component } from 'react'

export default class HomeMainPage extends Component 
{
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
        </div>

               
        )
    }
}
