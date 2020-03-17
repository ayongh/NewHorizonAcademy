import React, { Component } from 'react'
import Sidemenu from './sidemenu'

export default class main_browse_Show extends Component 
{
    render() 
    {       
        return (
        <div className="BrowseMain">
           <Sidemenu name="browse"/>
        </div>       
        )
    }
}
