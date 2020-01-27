import React, { Component } from 'react'
import SideMenu from './sidemenu'
export default class serachHome extends Component 
{

    render() 
    {
        return (
            <div className="search_home_body">
                <div className="Serach_home_container">
                    <SideMenu></SideMenu>
                </div>
            </div>
        )
    }
}