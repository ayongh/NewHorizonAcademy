import loginReducer from './ReducerLogin'
import authenticate from './ReducerAuthenticate'

import {combineReducers} from 'redux'


const allReducers = combineReducers({
    login: loginReducer,
    authenticate: authenticate,
})

export default allReducers;