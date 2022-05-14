
export const BASE_URL = "http://rations.in/api/v1/";

//onboarding
export const MID_POINT_AUTH = "auth/";
export const REQUEST_RATION_URL = BASE_URL + MID_POINT_AUTH + "rationRequest";
export const LOGIN_URL = BASE_URL + MID_POINT_AUTH + "login";
export const SIGNUP_URL = BASE_URL + MID_POINT_AUTH + "register?";

//get user lists api
export const MID_POINT_USER = "users?";
export const GET_DONOR_LIST = BASE_URL + MID_POINT_USER + "type=donor";

//terms webview
export const TERMS_WEBVIEW = 'http://rations.in/pages/terms-and-conditions'
