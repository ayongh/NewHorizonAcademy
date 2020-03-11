import {AUTH_VALID,AUTH_ERROR} from './ActionType'

export function ActionAuth() {
    return{
        type:AUTH_VALID,
    }
}

export function ActionAuthError(payload) {
    return{
        type:AUTH_ERROR,
        payload:payload
    }
}

