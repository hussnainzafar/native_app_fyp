import { IsDoingLogin, LoginSuccess, LoginFailure, SaveUser, SaveToken } from "../../actions/login/Types"

const initialState = {
    isPostingLoginData: false,
    user: {},
    token:'',
    loginResponse: {}
}

export default function LoginReducer(state = initialState, action) {
    switch (action.type) {
        case IsDoingLogin:
            return {
                ...state,
                isPostingLoginData: true
            }
        case LoginSuccess:
            return {
                ...state,
                isPostingLoginData: false,
                loginResponse: action.payload
            }
        case LoginFailure:
            return {
                ...state,
                isPostingLoginData: false
            }
        case SaveUser:
            return {
                ...state,
                user: action.payload
            }
        case SaveToken:
            return {
                ...state,
                token: action.payload
            }
    }
    return state
}