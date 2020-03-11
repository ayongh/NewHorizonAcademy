import {connect} from 'react-redux'
import axios from 'axios'
import {API_URL} from '../globalVariable'

export function authenicateDispatch(props)
{
    props.ActionAuth()
}


//access all the state
const mapToState = (state) =>{
    return {
        state:state
    }
}


export default connect(mapToState) (authenicateDispatch);