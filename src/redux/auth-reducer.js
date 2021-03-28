import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_USER_DATA = 'social-network-ver1.0/auth/SET_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })

export const getAuthMeThunkCreator = () => async (dispatch) => {
    let response = await authAPI.authMe();
    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}
export const loginThunkCreator = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.authLogin(email, password, rememberMe);
    if (response.data.resultCode === 0) {
        dispatch(getAuthMeThunkCreator());
    } else {
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

export default authReducer
