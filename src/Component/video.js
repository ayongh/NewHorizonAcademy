import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { Icon } from 'react-icons-kit'
import {buttonCheck} from 'react-icons-kit/metrize/buttonCheck'


class video extends Component
{
    constructor(props)
    {
        super(props)
        this.state= {
            classID: this.props.location.state.classID,

            sectionID:this.props.match.params.videoID,
            section:null,
        
            sectionData: JSON.parse( localStorage.getItem('video')),
            duration:null,
            progressValue:null,
            index:0,

            playing: false,
            url: null,
            control:true
        }
    }

    componentDidMount()
    {
        this.state.sectionData.forEach(element => {
            if(element._id === this.state.sectionID)
            {
                document.getElementById(element._id).style.color = 'green'
                this.setState({
                    section:element,           
                    url: element.videoUrl
                })
            }
        });
    }

    handleminimize=()=>
    {
        this.setState({
            control:false
        })
    }

    handleMaximize=()=>
    {
        this.setState({
            control:true
        })
    }

    onEnded=()=>
    {
        alert("on END")
    }

    handleProgress =(a)=>
    {
        this.setState({
            progressValue: a
        })
    }

    handleDuration = (duration) => {
        this.setState({
            duration: duration
        })
    }

    playlist(data)
    {
        document.getElementById(data._id).style.color = 'green'
        this.setState({
            url: data.videoUrl,
            section:data          
        })
    }

    getVideoList()
    {
        var videoList = this.state.sectionData.map((val,index)=>{
        return(
            <p key={val._id} onClick={()=>this.playlist(val)}><Icon id={val._id} className="nextVideoIcon" size={40} icon={buttonCheck}></Icon>{val.name}</p>
        )})

        return videoList
    }

    getNextPlaying()
    {

        if(this.state.section !== null)
        {
            return(
                <div className="contentWraper_episode_content">
                    <img className="caresoleImage_episode_video" src={this.state.section.thumbnail} alt={'apple'}/>
                    <div className="caresole_episode_desc">
                        <p className="noMargin">playing</p>
                        <p className="noMargin">{this.state.section.name}</p>
                        <p className="noMargin">Duration: {this.state.duration + " s"}</p>
                    </div>
                </div>
            )
        }
        
    }

    getpauseContent()
    {

        if(this.state.section !== null)
        {
            return(
                <div className="pauseContent">
                    <h1>{this.state.section.name}</h1>
                    <p>{this.state.section.description}</p>
                    <p> Duration: {this.state.duration}</p>
                </div>
            )
        }
        
    }

    async getImageBlobURL()
    {
        var file = new Blob([this.state.url], {type: "text/javascript"})
        var url = URL.createObjectURL(file)

        console.log(url)        
    }

    handlePause()
    {
        document.getElementById("pauseContent").style.display="flex";
    }

    pauseContentPlay()
    {
        this.setState({
            playing:true
        })

    }

    handleonplay()
    {
        document.getElementById("pauseContent").style.display="none";
    }

    render()
    {
        this.getImageBlobURL()
        return (
            <div className="Video_container" >
                <div className="video_warpper" onContextMenu={(e)=> e.preventDefault()}>

                    <ReactPlayer 
                        url= {this.state.url}
                        className='react-player'
                        pip={false}
                        playing={this.state.playing}
                        controls={this.state.control}
                        onEnablePIP	={this.handleminimize}
                        onDisablePIP = {this.handleMaximize}
                        onProgress={this.handleProgress}
                        onDuration={this.handleDuration}
                        onPause ={this.handlePause}
                        onPlay= {this.handleonplay}
                        width='80%'
                        height='100%'

                        onEnded={this.onEnded}
            
                        config={{ file: {
                            attributes: {
                                controlsList: 'nodownload'
                            }
                        }}}
                    />

                    <div className="pauseVideoContainer" id="pauseContent" onClick={()=>this.pauseContentPlay()}>
                        {this.getpauseContent()}
                    </div>
                </div>
                
                <div className="NextVideo_container_wrapper">
                    <div className="NextVideo_container">
                        <div className="Next_video">                        
                            <h2>videos</h2>

                            {this.getVideoList()}
                        </div>

                    </div>
                </div>

            </div>
            
        )
    }  
}

export default video;
