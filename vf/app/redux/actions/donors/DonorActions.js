import axios from "axios"
import { IsDoingGetDonors, GetDonorsSuccess, GetDonorsFailure } from "./Types"
import { GET_DONOR_LIST } from "../../../general/Constants"
export function postingGetDonorsData() {
    return {
        type: IsDoingGetDonors
    }
}

export function GetDonorsSuccessResponse(response) {
    return {
        type: GetDonorsSuccess,
        payload: response
    }
}

export function GetDonorsFailureResponse() {
    return {
        type: GetDonorsFailure
    }
}

export function GetDonorsUsers(token, success, failure) {

    return dispatch => {
        const configHeader = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        dispatch(postingGetDonorsData());
        axios.get(GET_DONOR_LIST, configHeader)
            .then((response) => {
                console.log(response);
                dispatch(GetDonorsSuccessResponse(response.data.data));
                success(response)
            })
            .catch((err) => {
                console.log(err)
                dispatch(GetDonorsFailureResponse());
                failure(err);
            })
    }
}