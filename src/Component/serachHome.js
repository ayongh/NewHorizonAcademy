import React, { Component } from 'react'
import SideMenu from './sidemenu'

export default class serachHome extends Component 
{
    constructor(prop)
    {
        super(prop)
        this.state = {
            loading:true
        }//state
    }//constructor

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