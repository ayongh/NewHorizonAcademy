import React, { Component } from 'react'
import Modal from 'react-responsive-modal';
import {Link} from 'react-router-dom'

import {buttonCheck} from 'react-icons-kit/metrize/buttonCheck'
import {buttonAdd} from 'react-icons-kit/metrize/buttonAdd'
import {cross} from 'react-icons-kit/metrize/cross'
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
            Popularclasses:null,
            newlyaddedclasses:null,
            healthclasses:null,
            educationclasses:null,
            watchHistoryclasses:null,
            
            class:null,

            likeFunction:null,
            likeList:null,

            ratingList:null,
            
            recomendationSimilar:null,
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

        axios.get(API_URL+'/course/listrating', {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
            if(res.status === 200)
            {
                this.setState({
                    ratingList:res.data.message
                })
            }

        }) 
    }
    
    componentDidMount()
    {
        var popularpayload= {
            pagination: 20
        }
        axios.post(API_URL+'/render/class/popular',popularpayload,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    Popularclasses:res.data
                })
            }
        })

        var newlyaddedpayload= {
            pagination: 20
        }
        axios.post(API_URL+'/render/class/newlyadded',newlyaddedpayload,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    newlyaddedclasses:res.data
                })
            }
        })

        var watchHistorypayload= {
            pagination: 20
        }
        axios.post(API_URL+'/render/class/watchHistory',watchHistorypayload,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    watchHistoryclasses:res.data.classes
                })
            }
        })

        var healthpayload= {
            categorie:"Health",
            pagination: 20
        }
        axios.post(API_URL+'/render/class/categorie',healthpayload,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    healthclasses:res.data
                })
            }
        })

        var educationpayload= {
            categorie:"education",
            pagination: 20
        }
        axios.post(API_URL+'/render/class/categorie',educationpayload,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{ 
            console.log(res)
            if(res.status === 200)
            {
                this.setState({
                    educationclasses:res.data
                })
            }
        })
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

    getHealthImageElement()
    {
        const Classes = this.state.healthclasses
        var classesElement

       
        if (Classes !== null)
        {
            classesElement = Classes.map( (val, index) => {
                var newTag= val.tag.replace(",", " #")
                return (
                    <div key= {val._id} className="new_contentWraper">
                        <img className="caresoleImage" id={val._id} onError={this.errorImag} src={val.thumbnail} alt={'apple'}/>
                        <div className="caresoleImage_description_wrapper">
                            <div className="top_caresoleImage_description">
                                <ion-icon name="caret-forward-circle-outline" style={{fontSize:"70px", color:'white', marginTop:"20%", cursor:"pointer"}} onClick={()=>this.open(val)}></ion-icon>
                            </div>                            
                            <div className="description">
                                <div className="bottom_caresoleImage_description">
                                    <h3 className="caresole_title">{val.name}</h3>
                                    <div className="tag_wrapper">
                                        <i><p className="tag">#{newTag}</p></i>
                                    </div>
                                    <p>{val.description}</p>
                                </div>
                            </div>
                        </div>      
                    </div>  
                )
            }) 
        }

        return classesElement;
    }

    getnewlyaddedImageElement()
    {
        const Classes = this.state.newlyaddedclasses
        var classesElement

       
        if (Classes !== null)
        {
            classesElement = Classes.map( (val, index) => {
                var newTag= val.tag.replace(",", " #")
                return (
                    <div key= {val._id} className="new_contentWraper">
                        <img className="caresoleImage" id={val._id} onError={this.errorImag} src={val.thumbnail} alt={'apple'}/>
                        <div className="caresoleImage_description_wrapper">
                            <div className="top_caresoleImage_description">
                                <ion-icon name="caret-forward-circle-outline" style={{fontSize:"70px", color:'white', marginTop:"20%", cursor:"pointer"}} onClick={()=>this.open(val)}></ion-icon>
                            </div>                            
                            <div className="description">
                                <div className="bottom_caresoleImage_description">
                                    <h3 className="caresole_title">{val.name}</h3>
                                    <div className="tag_wrapper">
                                        <i><p className="tag">#{newTag}</p></i>
                                    </div>
                                    <p>{val.description}</p>
                                </div>
                            </div>
                        </div>      
                    </div>  
                )
            }) 
        }

        return classesElement;
    }
    
    getPopluarImageElement()
    {
        const Classes = this.state.Popularclasses
        var classesElement

       
        if (Classes !== null)
        {
            classesElement = Classes.map( (val, index) => {
                var newTag= val.tag.replace(",", " #")
                return (
                    <div key= {val._id} className="new_contentWraper">
                        <img className="caresoleImage" id={val._id} onError={this.errorImag} src={val.thumbnail} alt={'apple'}/>
                        <div className="caresoleImage_description_wrapper">
                            <div className="top_caresoleImage_description">
                                <ion-icon name="caret-forward-circle-outline" style={{fontSize:"70px", color:'white', marginTop:"20%", cursor:"pointer"}} onClick={()=>this.open(val)}></ion-icon>
                            </div>                            
                            <div className="description">
                                <div className="bottom_caresoleImage_description">
                                    <h3 className="caresole_title">{val.name}</h3>
                                    <div className="tag_wrapper">
                                        <i><p className="tag">#{newTag}</p></i>
                                    </div>
                                    <p>{val.description}</p>
                                </div>
                            </div>
                        </div>      
                    </div>  
                )
            }) 
        }

        return classesElement;
    }

    getEducationImageElement()
    {
        const Classes = this.state.educationclasses
        var classesElement

       
        if (Classes !== null)
        {
            classesElement = Classes.map( (val, index) => {
                var newTag= val.tag.replace(",", " #")
                return (
                    <div key= {val._id} className="new_contentWraper">
                        <img className="caresoleImage" id={val._id} onError={this.errorImag} src={val.thumbnail} alt={'apple'}/>
                        <div className="caresoleImage_description_wrapper">
                            <div className="top_caresoleImage_description">
                                <ion-icon name="caret-forward-circle-outline" style={{fontSize:"70px", color:'white', marginTop:"20%", cursor:"pointer"}} onClick={()=>this.open(val)}></ion-icon>
                            </div>                            
                            <div className="description">
                                <div className="bottom_caresoleImage_description">
                                    <h3 className="caresole_title">{val.name}</h3>
                                    <div className="tag_wrapper">
                                        <i><p className="tag">#{newTag}</p></i>
                                    </div>
                                    <p>{val.description}</p>
                                </div>
                            </div>
                        </div>      
                    </div>  
                )
            }) 
        }

        return classesElement;
    }

    getWatchHistoryImageElement()
    {
        const Classes = this.state.watchHistoryclasses
        var classesElement

       
        if (Classes !== null)
        {
            classesElement = Classes.map( (val, index) => {
                var newTag= val.tag.replace(",", " #")
                return (
                    <div key= {val._id} className="new_contentWraper">
                        <img className="caresoleImage" id={val._id} onError={this.errorImag} src={val.thumbnail} alt={'apple'}/>
                        <div className="caresoleImage_description_wrapper">
                            <div className="top_caresoleImage_description">
                                <ion-icon name="caret-forward-circle-outline" style={{fontSize:"70px", color:'white', marginTop:"20%", cursor:"pointer"}} onClick={()=>this.open(val)}></ion-icon>
                            </div>                            
                            <div className="description">
                                <div className="bottom_caresoleImage_description">
                                    <h3 className="caresole_title">{val.name}</h3>
                                    <div className="tag_wrapper">
                                        <i><p className="tag">#{newTag}</p></i>
                                    </div>
                                    <p>{val.description}</p>
                                </div>
                            </div>
                        </div>      
                    </div>  
                )
            }) 
        }

        return classesElement;
    }

    getWatchHistory()
    {
        if(this.state.watchHistoryclasses !== null)
        {
            if(this.state.watchHistoryclasses.length >2)
            {
                return(
                    <div className="watchHistory_wrapper">
                        <h2 className="CaresoleCategorie">Watch History</h2>
                        <div className="caresoleWrapper">
                            <div className="caresole dragscroll">
                                {this.getWatchHistoryImageElement()}
                            </div>
                        </div>
                    </div>
                )  
            }
        }
         
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

        axios.get(API_URL+'/course/listrating', {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
            if(res.status === 200)
            {
                this.setState({
                    ratingList:res.data.message
                })
            }

        }) 

        var watchHistorypayload= {
            pagination: 20
        }
        axios.post(API_URL+'/render/class/watchHistory',watchHistorypayload,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    watchHistoryclasses:res.data.classes
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

    RenderLikeButton(val)
    {

        if(this.state.ratingList !== null)
        {
            var liked = "liked"+val._id
            var like = "like"+val._id

            var found =false;
            this.state.ratingList.map(element=>{
                if(element.classID === val._id)
                {
                   found = true

                }
                return found
            })

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
    }

    Renderwatchlistbutton(val)
    {
        if(this.state.watchHistoryclasses !== null)
        {
            var add = "add"+val._id
            var remove = "remove"+val._id

            var found =false;
            this.state.watchHistoryclasses.map(element=>{
                if(element._id === val._id)
                {
                   found = true
                }
                return found
            })

            if(found=== true)
            {
                if(document.getElementById(remove) != null)
                {
                    document.getElementById(add).style.display="none"
                    document.getElementById(remove).style.display="flex"

                }
            }
            else
            {
                if(document.getElementById(add) != null)
                {
                    document.getElementById(add).style.display="flex"
                    document.getElementById(remove).style.display="none"

                }
            }
            
        }  
    }

    removeLikeAction(classID)
    {
        var payload= {
            classID: classID
        }

        var liked = "liked"+classID._id
        var like = "like"+classID._id

        axios.post(API_URL+'/course/like/remove', payload, {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
            if(res.status === 200)
            {  
                
                document.getElementById(like).style.display="flex"
                document.getElementById(liked).style.display="none"             
                document.getElementById("message").innerHTML = "Class sucessfully disliked"
                document.getElementById('notification').style.display="flex"
                setTimeout(function(){ 
                    document.getElementById('notification').style.display="none"
        
                }, 3000);

                axios.get(API_URL+'/course/listrating', {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
                    if(res.status === 200)
                    {
                        this.setState({
                            ratingList:res.data.message
                        })
                    }
        
                }) 
            }
    
        }) 
    }

    LikeAction( classID)
    {
        var payload= {
            classID: classID
        }

        var liked = "liked"+classID._id
        var like = "like"+classID._id
        axios.post(API_URL+'/course/like', payload, {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
            if(res.status === 200)
            {  
                
                document.getElementById(liked).style.display="flex"
                document.getElementById(like).style.display="none"
                document.getElementById("message").innerHTML = "Sucessfully liked a class"
                document.getElementById('notification').style.display="flex"
                setTimeout(function(){ 
                    document.getElementById('notification').style.display="none"
                }, 3000);

                axios.get(API_URL+'/course/listrating', {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
                    if(res.status === 200)
                    {
                        this.setState({
                            ratingList:res.data.message
                        })
                    }
        
                }) 
            }
    
        }) 
    }

    addlist(val)
    {
        
        var data={
            classID:val._id
        }

        var add = "add"+val._id
        var remove = "remove"+val._id

        axios.post(API_URL+"/user/info/update/watchLater",data,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
            if(res.status === 200)
            {
                if(document.getElementById(remove) != null)
                {
                    document.getElementById(add).style.display="none"
                    document.getElementById(remove).style.display="flex"

                }
                document.getElementById("message").innerHTML = "Class sucessfully add to the Watch List"
                document.getElementById('notification').style.display="flex"
                setTimeout(function(){ 
                    document.getElementById('notification').style.display="none"
                }, 3000);

                var watchHistorypayload= {
                    pagination: 20
                }
                axios.post(API_URL+'/render/class/watchHistory',watchHistorypayload,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{ 
                    if(res.status === 200)
                    {
                        this.setState({
                            watchHistoryclasses:res.data.classes
                        })
                    }
                })
            }
        })
    }

    removeList(val)
    {
        var data={
            classID:val._id
        }

        var add = "add"+val._id
        var remove = "remove"+val._id

        axios.post(API_URL+"/user/info/update/watchLater/remove",data,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
            if(res.status === 200)
            {
                if(document.getElementById(add) != null)
                {
                    document.getElementById(add).style.display="flex"
                    document.getElementById(remove).style.display="none"

                }
                document.getElementById("message").innerHTML = "Class sucessfully removed from the Watch List"
                document.getElementById('notification').style.display="flex"
                setTimeout(function(){ 
                    document.getElementById('notification').style.display="none"
                }, 3000);

                var watchHistorypayload= {
                    pagination: 20
                }
                axios.post(API_URL+'/render/class/watchHistory',watchHistorypayload,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{ 
                    if(res.status === 200)
                    {
                        this.setState({
                            watchHistoryclasses:res.data.classes
                        })
                    }
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
                        <Link to={{pathname:"/watch/" + val._id, state:{classID: this.state.class._id, prevPath:"/browse/movie"}}} className="episode_link">
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
                    <Link to={{ pathname: "/watch/" + this.state.sectionContent.data[0]._id, state:{classID: this.state.class._id, prevPath:"/browse/movie"}}}>
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
                                <div className="popup_action">
                                    <Icon className="popup_movie_btn liked" style={{display:"none"}} id={"liked"+this.state.class._id} size={40} icon={buttonCheck} onClick={() =>this.removeLikeAction(this.state.class)}></Icon>
                                    <Icon className="popup_movie_btn" id={"like"+this.state.class._id} style={{display:"none"}} size={40} icon={buttonCheck} onClick={() =>this.LikeAction(this.state.class)}></Icon>
                                    {this.RenderLikeButton(this.state.class)}

                                    <Icon className="popup_movie_btn" id={"add"+this.state.class._id} size={40} icon={buttonAdd} onClick={() =>this.addlist(this.state.class)}></Icon>
                                    <Icon className="popup_movie_btn" id={"remove"+this.state.class._id}  size={40} icon={cross} onClick={() =>this.removeList(this.state.class)}></Icon>
                                    {this.Renderwatchlistbutton(this.state.class)}

                                </div>
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

    render() {
        const { open } = this.state;        
        return (
            <div>
                <div className="CaresoleCategorie">
                    <h2 className="categorie_title">popular</h2>
                    <a href="/browse/movie/popular"><div className="titleExplore">View All</div></a>
                </div>
                <div className="caresoleWrapper">
                    <div className="caresole dragscroll">
                        {this.getPopluarImageElement()}
                    </div>
                </div>

                <div className="CaresoleCategorie">
                    <h2 className="categorie_title">Newly Added</h2>
                    <a href="/browse/movie/newlyadded"><div className="titleExplore">View All</div></a>
                </div>
                <div className="caresoleWrapper">
                    <div className="caresole dragscroll">
                        {this.getnewlyaddedImageElement()}
                    </div>
                </div>

                {this.getWatchHistory()}

                <div className="CaresoleCategorie">
                    <h2 className="categorie_title">Health</h2>
                    <a href="/browse/movie/Health"><div className="titleExplore">View All</div></a>
                </div>
                <div className="caresoleWrapper">
                    <div className="caresole dragscroll">
                        {this.getHealthImageElement()}
                    </div>
                </div>

                <div className="CaresoleCategorie">
                    <h2 className="categorie_title">Education</h2>
                    <a href="/browse/movie/education"><div className="titleExplore">View All</div></a>
                </div>
                <div className="caresoleWrapper">
                    <div className="caresole dragscroll">
                        {this.getEducationImageElement()}
                    </div>
                </div>

                <div className="addedlistAlert" id="notification">
                    <p id="message">Sucessfully added to watch Later list</p>
                </div>

                <Modal open={open} onClose={this.onCloseModal} center style={{color:"white", width:"90vw",height:"80vh"}}>
                    {this.getModelContent()}
                </Modal>
            </div>
        );
      }
}