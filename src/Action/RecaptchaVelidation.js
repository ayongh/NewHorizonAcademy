import {connect} from 'react-redux'
import axios from 'axios'
import {API_URL} from '../globalVariable'

export async function recaptchaValidation(recaptchaToken) {

    var payload = {
        token:recaptchaToken
    }
    await axios.post(API_URL+'/user/login/recaptcha', payload, {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{
    
        if(res.status === 200)
        {
            return true
        }
        else
        {
            return false
        }
    })

    return false
}