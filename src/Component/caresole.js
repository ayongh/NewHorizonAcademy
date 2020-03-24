import React, { Component } from 'react'
import Modal from 'react-responsive-modal';
import {buttonCheck} from 'react-icons-kit/metrize/buttonCheck'
import {buttonAdd} from 'react-icons-kit/metrize/buttonAdd'
import {buttonClose} from 'react-icons-kit/metrize/buttonClose'
import { Icon } from 'react-icons-kit'

import axios from 'axios'
import {API_URL} from '../globalVariable'

import defaultImg from '../Component/img/nophoto.png'



export default class caresole extends Component 
{
    constructor(prop)
    {
        super(prop)

        this.state = {
            open: false,
            classes:null,
            class:null

        }
    }

    open(value)
    {
        this.setState
        ({
            class:value
        })
        
        axios.get(API_URL+'/course/findSection/'+value._id,{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{ 
            if(res.status === 200)
            {
                this.setState({
                    open:true
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
    errorImage(e)
    {
        e.target.src = defaultImg

    }
    getImageElement()
    {
        const Classes = this.state.classes
        var classesElement

        if (Classes !== null)
        {
            classesElement = Classes.map( (val, index) => {
                return (
                    <div key= {val._id} className="contentWraper" onClick={()=>this.open(val)}>
                        <img className="caresoleImage" id={val._id} onError={this.errorImag} src={val.thumbnail} alt={'apple'}/>
                        <div className="caresoleImage_description">
                            <h3>{val.name}</h3>
                            <p>{val.description}</p>
                            <div className="popup_action">
                                <Icon className="popup_movie_btn" size={40} icon={buttonCheck}></Icon>
                                <Icon className="popup_movie_btn" size={40} icon={buttonClose}></Icon>
                                <Icon className="popup_movie_btn" size={40} icon={buttonAdd}></Icon>
                            </div>
                        </div>
                        
                    </div>
                )
            }) 
        }

        return classesElement;
    }

    render() {
        const { open } = this.state;

        return (
            <div>
                <h2 className="CaresoleCategorie">{this.props.categorie}</h2>
                <div className="caresoleWrapper">
                    {this.getImageElement()}
                </div>

                <Modal open={open} onClose={this.onCloseModal} center style={{color:"white", width:"90vw",height:"80vh"}}>
                    <div className="popUp_img_container">
                        <div className="popup_title">
                            <h4>Abhishek</h4>
                        </div>

                        <div className="caresole_popup_img">
                            <div className="caresole_wrapper">
                                <div className="caresole_image_wrapper">
                                    <div className="caresole_image_wrapper_container">
                                        <img className="popup_image" src="https://drive.google.com/uc?id=1nqz-jkv55iXUeVh-r5ZgsmdRgQd6K9RM" alt={'apple'}/>
                                        <div className="popup_image_description">
                                            <Icon className="popup_movie_btn" size={150} icon={buttonCheck}></Icon>
                                        </div>
                                    </div>
                                </div>

                                <div className="caresole_popup_container">
                                    <h1>Title of the Movie</h1>
                                    <p className="popup_description">Fiction-writing also has modes: action, exposition, description, dialogue, summary, and transition.
                                    [4] Author Peter Selgin refers to methods, including action, dialogue, thoughts, summary, scenes, and description.[5] Currently, 
                                    there is no consensus within the writing community regarding the number and composition of fiction-writing modes and their uses. 
                                    Description is the fiction-writing mode for transmitting a mental image of the particulars of a story. Together with dialogue,
                                    </p>
                                    <div className="popup_action">
                                        <Icon className="popup_movie_btn" size={40} icon={buttonCheck}></Icon>
                                        <Icon className="popup_movie_btn" size={40} icon={buttonClose}></Icon>
                                        <Icon className="popup_movie_btn" size={40} icon={buttonAdd}></Icon>

                                    </div>

                                    
                                    <div className="popup_content_wraper">
                                        <nav>
                                            <button id="btnSection" onClick={()=>this.changeNav("btnSection")} href="#section">Section <span id="spanSection"></span></button>
                                            <button id="btnSimilar" onClick={()=>this.changeNav("btnSimilar")} href="#similar">Similar Classes <span id="spanSimilar"></span></button>
                                        </nav>
                                        <div className="popupSectionContent">
                                            <section id="section" className="Episodes">
                                                <div className="contentWraper_episode_content">
                                                    <img className="caresoleImage_episode" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt={'apple'}/>
                                                    <div className="caresole_episode_desc">
                                                        <h2 className="noMargin">Name of the Episode</h2>
                                                        <p className="noMargin">Episode Number</p>
                                                    </div>
                                                </div>
                                                <div className="contentWraper_episode_content">
                                                    <img className="caresoleImage_episode" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt={'apple'}/>
                                                    <div className="caresole_episode_desc">
                                                        <h2 className="noMargin">Name of the Episode</h2>
                                                        <p className="noMargin">Episode Number</p>
                                                    </div>
                                                </div>
                                                <div className="contentWraper_episode_content">
                                                    <img className="caresoleImage_episode" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt={'apple'}/>
                                                    <div className="caresole_episode_desc">
                                                        <h2 className="noMargin">Name of the Episode</h2>
                                                        <p className="noMargin">Episode Number</p>
                                                    </div>
                                                </div>
                                                <div className="contentWraper_episode_content">
                                                    <img className="caresoleImage_episode" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt={'apple'}/>
                                                    <div className="caresole_episode_desc">
                                                        <h2 className="noMargin">Name of the Episode</h2>
                                                        <p className="noMargin">Episode Number</p>
                                                    </div>
                                                </div>
                                                <div className="contentWraper_episode_content">
                                                    <img className="caresoleImage_episode" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt={'apple'}/>
                                                    <div className="caresole_episode_desc">
                                                        <h2 className="noMargin">Name of the Episode</h2>
                                                        <p className="noMargin">Episode Number</p>
                                                    </div>
                                                </div>
                                                <div className="contentWraper_episode_content">
                                                    <img className="caresoleImage_episode" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt={'apple'}/>
                                                    <div className="caresole_episode_desc">
                                                        <h2 className="noMargin">Name of the Episode</h2>
                                                        <p className="noMargin">Episode Number</p>
                                                    </div>
                                                </div>
                                                <div className="contentWraper_episode_content">
                                                    <img className="caresoleImage_episode" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt={'apple'}/>
                                                    <div className="caresole_episode_desc">
                                                        <h2 className="noMargin">Name of the Episode</h2>
                                                        <p className="noMargin">Episode Number</p>
                                                    </div>
                                                </div>

                                                <div className="contentWraper_episode_content">
                                                    <img className="caresoleImage_episode" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt={'apple'}/>
                                                    <div className="caresole_episode_desc">
                                                        <h2 className="noMargin">Name of the Episode</h2>
                                                        <p className="noMargin">Episode Number</p>
                                                    </div>
                                                </div>
                                                <div className="contentWraper_episode_content">
                                                    <img className="caresoleImage_episode" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt={'apple'}/>
                                                    <div className="caresole_episode_desc">
                                                        <h2 className="noMargin">Name of the Episode</h2>
                                                        <p className="noMargin">Episode Number</p>
                                                    </div>
                                                </div>
                                                
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
                </Modal>
            </div>
        );
      }
}
