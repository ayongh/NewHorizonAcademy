import React, { Component } from 'react'
import Modal from 'react-responsive-modal';
import {Link} from 'react-router-dom'

import {buttonCheck} from 'react-icons-kit/metrize/buttonCheck'
import {buttonAdd} from 'react-icons-kit/metrize/buttonAdd'
import {buttonClose} from 'react-icons-kit/metrize/buttonClose'
import { Icon } from 'react-icons-kit'

import axios from 'axios'
import {API_URL} from '../globalVariable'

export default class caresole extends Component 
{
    constructor(prop)
    {
        super(prop)

        this.state = {
            search:null,
            open: false,
            classes:null,
            class:null,
            ratingList:null,

            recomendationSimilar:null,

            sectionContent:null
        }
    }

    componentDidMount()
    {
        axios.get(API_URL+'/course/listrating', {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
            if(res.status === 200)
            {
                this.setState({
                    ratingList:res.data.message
                })
            }

        }) 

    }
    open(value)
    {
        this.setState
        ({
            class:value
        })
        
        axios.get(API_URL+'/course/findSection/'+value._id,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{ 
            if(res.status === 200)
            {
                localStorage.setItem("video", JSON.stringify( res.data.data));
                localStorage.setItem(this.state.class._id, JSON.stringify( res.data.data));
                await this.setState({
                    open:true,
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

    RenderLikeButton(val)
    {
        var found = false;

        if(this.state.ratingList != null)
        {
            this.state.ratingList.forEach(element => {
                console.log(element.classID)
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
                console.log(element.classID)
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


    onCloseModal = () => {
        this.setState({ open: false});
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

    getImageElement()
    {
        const Classes = this.state.classes
        var classesElement

       
        if (Classes !== null)
        {
            classesElement = Classes.map( (val, index) => {
                return (
                    <div key= {val._id} className="contentWraper searchContent">
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
        else
        {
            classesElement = 
            
                <div style={{width:"100%", textAlign:"center"}}>
                    <p>Please search using title </p>
                </div>
            
        }

        return classesElement;
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
                        <Link to={{pathname:"/watch/" + val._id, state:{classID: this.state.class._id}}} className="episode_link">
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

    getModelImage()
    {

        if(this.state.sectionContent !== null && this.state.sectionContent.data.length > 0)
        {
            return(
                <div className="caresole_image_wrapper_container">
                    <img className="popup_image" src={this.state.class.thumbnail} alt={'apple'}/>
                    <Link to={{ pathname: "/watch/" + this.state.sectionContent.data[0]._id, state:{classID: this.state.class._id}}}>
                        <div className="popup_image_description">
                            <Icon className="popup_movie_btn" size={150} icon={buttonCheck}></Icon>
                        </div>
                    </Link>
                    
                </div>
            )
        }
        else
        {
            return(
                <div className="caresole_image_wrapper_container">
                    <img className="popup_image" src={this.state.class.thumbnail} alt={'apple'}/>
                    <div className="popup_image_description">
                        <Icon className="popup_movie_btn" size={150} icon={buttonCheck}></Icon>
                    </div>
                </div>
            )
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

    similarMovieBotton(value)
    {
        this.setState
        ({
            class:value
        })
        
        axios.get(API_URL+'/course/findSection/'+value._id,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{ 
            if(res.status === 200)
            {
                localStorage.setItem("video", JSON.stringify( res.data.data));
                localStorage.setItem(this.state.class._id, JSON.stringify( res.data.data));
                await this.setState({
                    open:true,
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

    getModelContent()
    {
        if(this.state.open)
        {
            return(
                <div className="popUp_img_container">
                    <div className="popup_title">
                        <h4>{this.state.class.name}</h4>
                    </div>

                    <div className="caresole_popup_img">
                        <div className="caresole_wrapper">
                            <div className="caresole_image_wrapper">
                                {this.getModelImage()}
                            </div>

                            <div className="caresole_popup_container">
                                <h1>{this.state.class.name}</h1>
                                <p className="popup_description">
                                    {this.state.class.description}
                                </p>
                                
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
                        
                    </div>
                </div>
            )
        }
        else
        {
            return(
                <div>
                    <h3>No content found with such name</h3>
                </div>
            )
        }
    }

    handleChange = (e) =>
    {
        this.setState({
            [e.target.id]: e.target.value
        })

        axios.get(API_URL+'/course/search/'+this.state.search,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    classes:res.data.data
                })
            }
        })

    }


    render() {
        const { open } = this.state; 
        
        return (
            <div>
                <h2 className="CaresoleCategorie">{this.props.categorie}</h2>
                <div className="caresoleWrapper">
                    <input className="search" id="search" onChange={this.handleChange} type="text" placeholder="Search"/>

                    <div className="Searchcaresole">
                        {this.getImageElement()}
                    </div>
                </div>

                <Modal open={open} onClose={this.onCloseModal} center style={{color:"white", width:"90vw",height:"80vh"}}>
                    {this.getModelContent()}
                </Modal>
            </div>
        );
      }
}
