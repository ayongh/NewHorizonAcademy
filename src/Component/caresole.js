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
            open: false,
            classes:null,
            class:null,

            sectionContent:null
        }
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
    }
    
    componentDidMount()
    {
        axios.get(API_URL+'/course/all',{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    classes:res.data.classes
                })
            }
        })
    }

    RenderLikeButton(val)
    {
        var LikeList= JSON.parse( localStorage.getItem("userLikes"))
        var flag = false;
        var likeButton;

        if(LikeList !== undefined && LikeList !== null)
        {
            for(var i = 0; i < LikeList.length; i++)
            {
                if(val._id === LikeList[i])
                {
                    flag = true;
                    break
                }
            }

        }
        
        if(flag)
        {
            likeButton =  <Icon className="popup_movie_btn" style={{color:"green"}} id={"like"+val._id} size={40} icon={buttonCheck} onClick={() =>this.LikeAction(val._id)}></Icon>

        }
        else
        {
            likeButton =  <Icon className="popup_movie_btn" id={"like"+val._id} size={40} icon={buttonCheck} onClick={() =>this.LikeAction(val._id)}></Icon>
        }

        return likeButton

    }

    RenderdisLikeButton(val)
    {
        var LikeList= JSON.parse( localStorage.getItem("userDisLike"))
        var flag = false;
        var likeButton;

        if(LikeList !== undefined && LikeList !== null)
        {
            for(var i = 0; i < LikeList.length; i++)
            {
                if(val._id === LikeList[i])
                {
                    flag = true;
                    break
                }
            }

        }
        
        if(flag)
        {
            likeButton =  <Icon className="popup_movie_btn" style={{color:"red"}} id={"dislike"+val._id} size={40} icon={buttonClose} onClick={() =>this.disLikeAction(val._id)}></Icon>

        }
        else
        {
            likeButton = <Icon className="popup_movie_btn" id={"dislike"+val._id} size={40} icon={buttonClose} onClick={() =>this.disLikeAction(val._id)}></Icon>

        }

        return likeButton
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
            document.getElementById("similar").style.display = "block"
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

    getModelEpisodes()
    {
        const episodes = this.state.sectionContent
        var episodeElement

       
        if (episodes !== null)
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

        return episodeElement;
    }

    getModelImage()
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

    LikeAction( classID)
    {
        var payload= {
            classID: classID
        }
        
        axios.post(API_URL+'/course/like', payload, {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
            if(res.status === 200)
            {
                localStorage.setItem("userLikes", JSON.stringify( res.data.data.like))
                localStorage.setItem("userDisLike",JSON.stringify( res.data.data.dislike))
                var likeID= "like"+classID
                document.getElementById(likeID).style.color = "green"
            }    
        }) 
    }

    disLikeAction( classID)
    {
        console.log(classID)
        var payload= {
            classID: classID
        }
        
        axios.post(API_URL+'/course/dislike', payload, {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
            console.log(res.data)
    
        }) 
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
                                            <div className="contentWraper">
                                                <img className="caresoleImage" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt={'apple'}/>
                                                <h3>Similar</h3>
                                            </div>
                                        </section>
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            )
        }
    }


    render() {
        const { open } = this.state;        

        return (
            <div>
                <h2 className="CaresoleCategorie">{this.props.categorie}</h2>
                <div className="caresoleWrapper">
                    <div className="caresole">
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
