import axios from "axios"
import { IsDoingLogin, LoginSuccess, LoginFailure, SaveUser, SaveToken } from "./Types"
import { LOGIN_URL } from "../../../general/Constants"
import qs from 'querystring';
import { configHeader } from "../../../utils/Utilities";


export function postingLoginData() {
    return {
        type: IsDoingLogin
    }
}

export function LoginSuccessResponse(response) {
    return {
        type: LoginSuccess,
        payload: response
    }
}

export function LoginFailureResponse() {
    return {
        type: LoginFailure
    }
}

export function loginUser(params, success, failure) {
    return dispatch => {
        dispatch(postingLoginData());
        axios.post(LOGIN_URL, qs.stringify(params), configHeader)
            .then((response) => {
                dispatch(LoginSuccessResponse(response));
                success(response);
            })
            .catch((err) => {
                dispatch(LoginFailureResponse());
                failure(err.response.data.error)
            })
    }
}

export function saveUserInReduxStore(user) {
    return {
        type: SaveUser,
        payload: user
    }
}

export function saveTokenInReduxStore(token) {
    return {
        type: SaveToken,
        payload: token
    }
}
