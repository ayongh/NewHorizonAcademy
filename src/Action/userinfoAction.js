import {USER_INITALIZED, USER_NAME,USER_EMAIL,USER_ERROR} from './ActionType'

export function ActionUserIntialize(payload) {
    console.log("asdf")
    return{
        type:USER_INITALIZED,
        payload:payload
    }
}

export function ActionUserUpdateName(payload) {
    return{
        type:USER_NAME,
        payload:payload
    }
}

export function ActionUserUpdateEmail(payload) {
    alert(payload)
    return{
        type:USER_EMAIL,
        payload:payload
    }
}

export function ActionUserError(payload) {
    return{
        type:USER_ERROR,
        payload:payload
    }
}
