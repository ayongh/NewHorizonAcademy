import React, { Component } from 'react'
import axios from 'axios'
import {API_URL} from '../globalVariable'

import {buttonCheck} from 'react-icons-kit/metrize/buttonCheck'
import {buttonAdd} from 'react-icons-kit/metrize/buttonAdd'
import {buttonClose} from 'react-icons-kit/metrize/buttonClose'
import { Icon } from 'react-icons-kit'


export default class HomeMainPage extends Component 
{
    constructor(prop)
    {
        super(prop)

        this.state = {
            classes:null,
            class:null,

            ratingList:null,

            maincontent:null
        }
    }
    

    componentDidMount()
    {
        var data={
            classID:"aksdfjlks"
        }

        axios.post(API_URL+"/recomendation/collaborative",data,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{

            if(res.status === 200)
            {
                if(res.data.message.length>0)
                {
                    this.setState({
                        maincontent:res.data.mainContent,
                        classes:res.data.message
                    })
                }
            }
            
        })

        axios.get(API_URL+'/course/listrating', {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
            if(res.status === 200)
            {
                this.setState({
                    ratingList:res.data.message
                })
            }

        }) 

    }

    getImageElement()
    {
        const Classes = this.state.classes
        var classesElement

       
        if (Classes !== null)
        {
            classesElement = Classes.map( (val, index) => {
                return (
                    <div key= {val._id} className="contentWraper">
                        <img className="caresoleImage" id={val._id} onError={this.errorImag} src={val.thumbnail} alt={'apple'}/>
                        <div className="caresoleImage_description">
                            <h3>{val.name}</h3>
                            <p>{val.description}</p>
                            <div className="popup_action">
                                {this.RenderLikeButton(val)}
                                {this.RenderdisLikeButton(val)}
                                <Icon className="popup_movie_btn" id={"add"+val._id} size={40} icon={buttonAdd} onClick={()=>this.open(val)}></Icon>
                            </div>
                        </div>      
                    </div>  
                )
            }) 
        }

        return classesElement;
    }

    RenderLikeButton(val)
    {
        var found = false;

        if(this.state.ratingList != null)
        {
            this.state.ratingList.forEach(element => {
                if(element.classID === val._id)
                {
                    if(element.rating > 0)
                    {
                        found=true
                    }
                }
            });
        }

        if(found=== true)
        {
            return <Icon className="popup_movie_btn" id={"like"+val._id} size={40} style={{color:"green"}} icon={buttonCheck} onClick={() =>this.LikeAction(val._id, this.id)} ></Icon>
        }
        else
        {
            return <Icon className="popup_movie_btn" id={"like"+val._id} size={40} icon={buttonCheck} onClick={() =>this.LikeAction(val._id, this.id)}></Icon>
        }

    }

    RenderdisLikeButton(val)
    {
        var found = false;

        if(this.state.ratingList != null)
        {
            this.state.ratingList.forEach(element => {
                if(element.classID === val._id)
                {
                    if(element.rating < 0)
                    {
                        found=true
                    }
                }
            });
        }

        if(found=== true)
        {
            return  <Icon className="popup_movie_btn" id={"dislike"+val._id} size={40} icon={buttonClose} style={{color:"red"}} onClick={() =>this.disLikeAction(val._id, this.id)}></Icon>
        }
        else
        {
            return  <Icon className="popup_movie_btn" id={"dislike"+val._id} size={40} icon={buttonClose} onClick={() =>this.disLikeAction(val._id, this.id)}></Icon>
        }    
    }

    LikeAction( classID, componentID)
    {
        var payload= {
            classID: classID
        }
        
        var likeID = "like"+classID
        var dislikeID = "dislike"+classID

        axios.post(API_URL+'/course/like', payload, {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
            if(res.status === 200)
            {
                document.getElementById(likeID).style.color = "green"
                document.getElementById(dislikeID).style.color = "white"

            }
            else
            {
                document.getElementById(likeID).style.color = "green"
                document.getElementById(dislikeID).style.color = "white"
            }
    
        }) 
    }

    disLikeAction( classID, componentID)
    {
        var payload= {
            classID: classID
        }
        
        var likeID = "like"+classID
        var dislikeID = "dislike"+classID

        axios.post(API_URL+'/course/dislike', payload, {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
            if (res.status === 200)
            {
                document.getElementById(likeID).style.color = "white"
                document.getElementById(dislikeID).style.color = "red"
            }
            else{
                document.getElementById(likeID).style.color = "white"
                document.getElementById(dislikeID).style.color = "red"
            }
    
        }) 
    }

    getMainContentElement()
    {
        if(this.state.maincontent !=null)
        {
            return(
                <div className="search_home_main_header">
                    <img className="mainContaineerImg" id={this.state.maincontent._id} onError={this.errorImag} src={this.state.maincontent.thumbnail} alt={'apple'}/>

                    <div className="search_home_main_header_left">
                        <h2>{this.state.maincontent.name}</h2>
                        <div className="main_header_left_content">
                            <p>{this.state.maincontent.description}</p>
                        </div>
                        {this.RenderLikeButton(this.state.maincontent)}
                        {this.RenderdisLikeButton(this.state.maincontent)}
                    </div>

                    
                </div>

            )
        }
    }

    render() 
    {
        return (

        <div className="search_home_main_container">
            {this.getMainContentElement()}

            <div className="search_home_main_header_small">
                <div className="caresoleWrapper">
                    <div className="caresole dragscroll">
                        {this.getImageElement()}
                    </div>
                </div>
            </div>
        </div>

               
        )
    }
}
