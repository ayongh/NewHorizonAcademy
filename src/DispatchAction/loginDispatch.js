import {connect} from 'react-redux'
import React, { Component } from 'react';
import axios from 'axios'
import {API_URL} from '../globalVariable'
import {Redirect} from 'react-router-dom'

export function loginDispatch(payload, props)
{
    axios.post(API_URL+'/user/login/recaptcha', payload, {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{
        props.ActionLoading()    
 
        if(res.status === 200)
        {
            axios.post(API_URL+'/user/login', payload, {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{
                if(res.status === 200)
                {
                    props.Actionlogin()
                }
                else
                {
                    props.ActionError(res.data.errors)
                }
            })

        }
        else
        {
            props.ActionError(res.data.errors)
        }
    })
}

export async function authDispatch( props)
{
    props.ActionLoading()    

    try {
        await axios.get(API_URL+'/token/validation',{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then(res=>{
            if(res.status===200)
            {
                props.Actionlogin()
            }
            else {
                props.ActionError(res.data.errors)
            }
        })
    } catch (error) {
        props.ActionError('No internet Access')

    }
    
    
}

//access all the state
const mapToState = (state) =>{
    return {
        state:state
    }
}


export default connect(mapToState) (loginDispatch);