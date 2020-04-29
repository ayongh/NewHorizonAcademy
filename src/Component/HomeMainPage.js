import React, { Component } from 'react'
import axios from 'axios'
import {API_URL} from '../globalVariable'
import {Link} from 'react-router-dom'

import {buttonCheck} from 'react-icons-kit/metrize/buttonCheck'
import {buttonAdd} from 'react-icons-kit/metrize/buttonAdd'
import {buttonClose} from 'react-icons-kit/metrize/buttonClose'
import { Icon } from 'react-icons-kit'


export default class HomeMainPage extends Component 
{
    constructor(props)
    {
        super(props)

        this.state = {
            classes:null,
            class:null,

            ratingList:null,
            recomendationSimilar:null,

            sectionContent:null,
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
                        class:res.data.mainContent,
                        classes:res.data.message
                    })

                    axios.get(API_URL+'/course/findSection/'+res.data.mainContent._id,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{ 
                        if(res.status === 200)
                        {
                            localStorage.setItem("video", JSON.stringify( res.data.data));
                            localStorage.setItem(this.state.class._id, JSON.stringify( res.data.data));
                            await this.setState({
                                sectionContent: res.data
                            })
            
                        }
                    })

                    var data={
                        classID:res.data.mainContent._id
                    }
                    
                    axios.post(API_URL+"/recomendation/content",data,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
                        if(res.status === 200)
                        {
                            if(res.data.message.length>0)
                            {
                                this.setState({
                                    recomendationSimilar:res.data.message
                                })
                            }
                        }
                        
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

    changeNav(id)
    {
        if(id === "btnSection")
        {
            document.getElementById("btnSection").style.borderBottom="solid"
            document.getElementById("btnSimilar").style.borderBottom="none"

            document.getElementById("section").style.display = "block"
            document.getElementById("similar").style.display = "none"
        }

        if(id==="btnSimilar")
        {
            document.getElementById("btnSection").style.borderBottom="none"
            document.getElementById("btnSimilar").style.borderBottom="solid"
            document.getElementById("section").style.display = "none"
            document.getElementById("similar").style.display = "inline-flex"
        }
    }

    similarMovieBotton(value)
    {

        this.setState
        ({
            maincontent:value
        })

        axios.get(API_URL+'/course/findSection/'+value._id,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{ 
            if(res.status === 200)
            {
                localStorage.setItem("video", JSON.stringify( res.data.data));
                localStorage.setItem(this.state.class._id, JSON.stringify( res.data.data));
                this.setState({
                    sectionContent: res.data
                })

            }
        })

        var data={
            classID:value._id
        }
        axios.post(API_URL+"/recomendation/content",data,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
            if(res.data.message.length>0)
            {
                this.setState({
                    recomendationSimilar:res.data.message
                })
            }
        })

        
    }


    getModelEpisodes()
    {
        const episodes = this.state.sectionContent
        var episodeElement

        if (episodes !== null && episodes.data.length > 0)
        {
            episodeElement = episodes.data.map( (val, index) => {
                return (
                    <div key= {val._id} className="contentWraper_episode_content">
                        <Link to={{pathname:"/watch/" + val._id, state:{classID: this.state.class._id, prevPath: "/Homepage"}}} className="episode_link">
                            <img className="caresoleImage_episode" src={val.thumbnail} alt={'apple'}/>
                        </Link>

                        <div className="caresole_episode_desc">
                            <h2 className="noMargin nohref">{val.name}</h2>
                            <p className="noMargin nohref">Episode {index+1}</p>
                        </div>
                    </div>
                )
            }) 
        }
        else
        {
            return(
                <div className="noepisode">
                    <p>No video found for this class</p>
                </div>
            )
        }

        return episodeElement;
    }

    getSimilarclass()
    {
        var similarContentElement

        if(this.state.recomendationSimilar !== null)
        {
            similarContentElement = this.state.recomendationSimilar.map((val,index) =>
            {
                return(
                    <div className="contentWraperSimilar" key={index} onClick={() =>this.similarMovieBotton(val)}>
                        <img className="caresoleImage" src={val.thumbnail} alt={'apple'}/>
                        <h3>{val.name}</h3>
                    </div>
                )

            })
            
        }
        
        return similarContentElement
        
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
                                <Icon className="popup_movie_btn" id={"liked"+val._id} size={40} style={{color:"green", display:"none"}} icon={buttonCheck} onClick={() =>this.removeLikeAction(val._id)} ></Icon>
                                <Icon className="popup_movie_btn" id={"like"+val._id} size={40} style={{display:"none"}} icon={buttonCheck} onClick={() =>this.LikeAction(val._id)} ></Icon>
                                {this.RenderLikeButton(val)}

                                <a href= "#topid" style={{color:"white"}}><Icon className="popup_movie_btn" id={"add"+val._id} size={40} icon={buttonAdd} onClick={()=>this.similarMovieBotton(val)}></Icon></a>
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

        var liked = "liked"+val._id
        var like = "like"+val._id

        if(found=== true)
        {
            if(document.getElementById(liked) != null)
            {
                document.getElementById(liked).style.display="flex"
                document.getElementById(like).style.display="none"

            }
        }
        else
        {
            if(document.getElementById(like) != null)
            {
                document.getElementById(like).style.display="flex"
                document.getElementById(liked).style.display="none"

            }
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

    LikeAction( classID)
    {
        var payload= {
            classID: classID
        }
        
        var like = "like"+classID
        var liked = "liked"+classID

        axios.post(API_URL+'/course/like', payload, {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
            if(res.status === 200)
            {  
                document.getElementById(liked).style.display = "flex"
                document.getElementById(like).style.display = "none"
            }
    
        }) 
    }

    removeLikeAction(classID)
    {
        var payload= {
            classID: classID
        }
        
        var like = "like"+classID
        var liked = "liked"+classID

        axios.post(API_URL+'/course/like/remove', payload, {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
            if(res.status === 200)
            {  
                document.getElementById(liked).style.display = "none"
                document.getElementById(like).style.display = "flex"
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
                        <Icon className="popup_movie_btn" id={"liked"+this.state.maincontent._id} size={40} style={{color:"green", display:"none"}} icon={buttonCheck} onClick={() =>this.removeLikeAction(this.state.maincontent._id)} ></Icon>
                        <Icon className="popup_movie_btn" id={"like"+this.state.maincontent._id} size={40} style={{color:"white",display:"none"}} icon={buttonCheck} onClick={() =>this.LikeAction(this.state.maincontent._id)} ></Icon>
                        {this.RenderLikeButton(this.state.maincontent)}

                        <div className="popup_content_wraper">
                            <nav>
                                <button id="btnSection" onClick={()=>this.changeNav("btnSection")} href="#section">Section <span id="spanSection"></span></button>
                                <button id="btnSimilar" onClick={()=>this.changeNav("btnSimilar")} href="#similar">Similar Classes <span id="spanSimilar"></span></button>
                            </nav>

                            <div className="popupSectionContent">
                                <section id="section" className="Episodes">
                                    { this.getModelEpisodes()}
                                </section>

                                <section id="similar">
                                    {this.getSimilarclass()}
                                </section>
                            </div>
                        
                        </div>  
                    </div>
                </div>
            )
        }
    }

    render() 
    {
        return (

        <div className="search_home_main_container" id="topid">
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
