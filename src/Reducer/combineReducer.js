import loginReducer from './ReducerLogin'
import userinfoReducer from './ReducerUserInfo'

import {combineReducers} from 'redux'


const allReducers = combineReducers({
    login: loginReducer,
    userInfo: userinfoReducer
})

export default allReducers;