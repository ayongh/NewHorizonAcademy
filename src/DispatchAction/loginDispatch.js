import {connect} from 'react-redux'
import axios from 'axios'
import {API_URL} from '../globalVariable'

export async function authDispatch( props)
{
    props.ActionLoading()    
    try {
        await axios.get(API_URL+'/token/validation',{withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then(res=>{
            if(res.status===200)
            {
                props.Actionlogin()
                props.ActionUserIntialize(res.data.message)
            }
            else {
                props.ActionError(res.data.errors)
            }
        })
    } catch (error) {
        props.ActionError('No internet Access')
    }
}
  

//access all the state
const mapToState = (state) =>{
    return {
        state:state
    }
}


export default connect(mapToState) (authDispatch);