import React, { Component } from 'react'
import Caresole from './caresole'

export default class browse extends Component 
{
    render() 
    {       
        return (
        <div className="BrowseMain">
            <Caresole categorie={"Movie"}></Caresole>
        </div>       
        )
    }
}
