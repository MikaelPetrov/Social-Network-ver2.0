import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload,
            }
        }
        default:
            return state;
    }
}

export const setAuthUserData = (id, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { id, email, login, isAuth } })

export const getAuthMeThunkCreator = () => (dispatch) => {
    return authAPI.authMe()
        .then(response => {
            if (response.data.resultCode === 0) {
                let { id, email, login } = response.data.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
        });
}
export const loginThunkCreator = (email, password, rememberMe) => (dispatch) => {
    authAPI.authLogin(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthMeThunkCreator());
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Error';
                dispatch(stopSubmit('loginForm', { _error: message }));
            }
        });
}
export const logoutThunkCreator = () => (dispatch) => {
    authAPI.authLogout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
}

export default authReducer;