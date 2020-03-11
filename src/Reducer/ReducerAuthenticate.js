import{AUTH_VALID,AUTH_ERROR} from '../Action/ActionType'

const Authenticate = ( state, action)=>
{
    switch(action.type)
    {
        case AUTH_VALID: 
            return {
                ...state,
                loginFlag:true
            }

        case AUTH_ERROR:
            return {
                ...state,
                loginFlag:false,
                error: action.payload
            }
            

        default:
            return{
                ...state
            }
    }
}

export default Authenticate;