import { IsDoingGetDonors, GetDonorsSuccess, GetDonorsFailure, } from "../../actions/donors/Types"

const initialState = {
    isGettingDonorsData: false,
    donorsArray: []
}

export default function GetDonorsReducer(state = initialState, action) {
    switch (action.type) {
        case IsDoingGetDonors:
            return {
                ...state,
                isGettingDonorsData: true
            }
        case GetDonorsSuccess:
            return {
                ...state,
                isGettingDonorsData: false,
                donorsArray: action.payload
            }
        case GetDonorsFailure:
            return {
                ...state,
                isGettingDonorsData: false
            }

    }
    return state
}