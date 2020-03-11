import React, { Component } from 'react'
import Modal from 'react-responsive-modal';
import {buttonCheck} from 'react-icons-kit/metrize/buttonCheck'
import {buttonAdd} from 'react-icons-kit/metrize/buttonAdd'
import {buttonClose} from 'react-icons-kit/metrize/buttonClose'
import { Icon } from 'react-icons-kit'



export default class caresole extends Component 
{
    constructor(prop)
    {
        super(prop)

        this.state = {
            open: false,
        }
    }

    openModel(id)
    {
        this.setState({
            open:true
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
    
    render() {
        const { open } = this.state;

        return (
            <div>
                <h2 className="CaresoleCategorie">{this.props.categorie}</h2>
                <div className="caresoleWrapper">
                    <div className="contentWraper" onClick={() => this.openModel("id")}>
                        <img className="caresoleImage" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt="image"/>
                        <h3>Title of the movie</h3>
                    </div>
                    <div className="contentWraper">
                        <img className="caresoleImage" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt="image"/>
                        <h3>Title of the movie</h3>
                    </div>
                </div>
                <Modal open={open} onClose={this.onCloseModal} center style={{color:"white", width:"80vw",height:"80vh"}}>
                    <div className="popUp_img_container">
                        <div className="popup_title">
                            <h4>Movie Name</h4>
                        </div>

                        <div className="popup_image">
                            <img className="caresole_pop_Image" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt="image"/>
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
                            </div>
                        </div>
                    </div>

                    <div className="popup_content_wraper">
                        <nav>
                            <button id="btnSection" onClick={()=>this.changeNav("btnSection")} href="#section">Section <span id="spanSection"></span></button>
                            <button id="btnSimilar" onClick={()=>this.changeNav("btnSimilar")} href="#similar">Similar Classes <span id="spanSimilar"></span></button>
                        </nav>
                        <div className="popupSectionContent">
                            <section id="section">
                                <div className="contentWraper">
                                    <img className="caresoleImage" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt="image"/>
                                    <h3>section</h3>
                                </div>
                                <div className="contentWraper">
                                    <img className="caresoleImage" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt="image"/>
                                    <h3>section</h3>
                                </div>
                                <div className="contentWraper">
                                    <img className="caresoleImage" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt="image"/>
                                    <h3>section</h3>
                                </div>

                                <div className="contentWraper">
                                    <img className="caresoleImage" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt="image"/>
                                    <h3>section</h3>
                                </div>

                                <div className="contentWraper">
                                    <img className="caresoleImage" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt="image"/>
                                    <h3>section</h3>
                                </div>
                            </section>

                            <section id="similar">
                                <div className="contentWraper">
                                    <img className="caresoleImage" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt="image"/>
                                    <h3>Similar</h3>
                                </div>
                            </section>
                        </div>
                       
                    </div>
                    
                </Modal>
            </div>
        );
      }
}
