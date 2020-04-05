import axios from 'axios'
import {API_URL} from '../globalVariable'

export async function LikeActions (classID) {

    payload= {
        classID: classID
    }
    await axios.post(API_URL+'course/like', payload, {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{

    }) 

}