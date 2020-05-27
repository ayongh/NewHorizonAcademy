import React, { Component } from 'react'
import axios from 'axios'
import {API_URL} from '../globalVariable'
import {storage} from './firebaseStorage'
import { Progress } from 'semantic-ui-react'


class upload extends Component 
{
    //Constructor
    constructor(prop)
    {
        super(prop)

        this.state = {
            image: null,
            url:'',
            percent: 0 
        }
    }
    
    handleChange = (e) =>{

        if(e.target.files.length >= 1)
        {
            this.setState({
                image: e.target.files[0]
            })
        }
        else
        {
            console.log("error when selcting file")

        }
    }

    handleUpload=()=>{

        if(this.state.image !== null)
        {
            var storageRef = storage.ref()
            
            var imageRef = storageRef.child('video')

            var fileName = this.state.image.name
            var spaceRef = imageRef.child(fileName)

            var uploadTask = spaceRef.put(this.state.image);

            uploadTask.on('state_changed',
            function(snapshot)
            {
                document.getElementById('containerProgressID').style.visibility="visible"
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                this.setState({
                    percent: progress
                })
            }.bind(this), 
            function(error){
                console.log(error)
            },
            function (){
                document.getElementById('containerProgressID').style.visibility="collapse"

                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log('File available at', downloadURL);
                });
            }
            )
        }
    }
    
    render() 
    {

        return (
            <div className="body">
                <h1>Create Class</h1>
                <div className="classinfo_container">
                    <div className="classinfo">
                        <input type="text" id="name" placeholder="Name" accept="image/*"></input>
                        <input type="text" id="description" placeholder="Description"></input>


                    </div>
                </div>
                <input type="file" onChange={this.handleChange}/>
                <div className="container" id="containerProgressID" style={{visibility:"collapse", marginTop:"10px"}}>
                    <Progress percent={this.state.percent} indicating />
                </div>
                <button onClick={this.handleUpload}>Upload</button>
            </div>
        )
    }
}

export default upload