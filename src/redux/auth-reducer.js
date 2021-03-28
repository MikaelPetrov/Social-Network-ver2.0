import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = 'social-network-ver1.0/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'social-network-ver1.0/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })
export const getCaptchaUrlSuccess = (captchaUrl) => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } })

export const getAuthMeThunkCreator = () => async (dispatch) => {
    let response = await authAPI.authMe();
    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const loginThunkCreator = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.authLogin(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthMeThunkCreator());
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrlThunkCreator());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Error';
        dispatch(stopSubmit('loginForm', { _error: message }));
    }
}

export const logoutThunkCreator = () => async (dispatch) => {
    let response = await authAPI.authLogout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrlThunkCreator = () => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl();
    let captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer
