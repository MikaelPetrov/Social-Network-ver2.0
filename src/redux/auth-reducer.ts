import { stopSubmit } from "redux-form";
import { authAPI, ResultCodeEnum, securityAPI } from '../api/api';

const SET_AUTH_USER_DATA = 'social-network-ver2.0/auth/SET_AUTH_USER_DATA'
const GET_CAPTCHA_URL = 'social-network-ver2.0/auth/GET_CAPTCHA_URL'

//  authInitialState and authReducer
let authInitialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null
}

type AuthInitialStateType = typeof authInitialState

const authReducer = (state = authInitialState, action: any): AuthInitialStateType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
        case GET_CAPTCHA_URL:
            return {
                ...state, ...action.payload
            }
        default:
            return state
    }
}

//  setAuthUserDataAction
type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_AUTH_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}
export const setAuthUserDataAction = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_AUTH_USER_DATA, payload: { userId, email, login, isAuth }
})

//  getCaptchaUrlAction
type GetCaptchaUrlActionType = {
    type: typeof GET_CAPTCHA_URL
    payload: { captchaUrl: string }
}
export const getCaptchaUrlAction = (captchaUrl: string): GetCaptchaUrlActionType => ({
    type: GET_CAPTCHA_URL, payload: { captchaUrl }
})

//  getAuthMeThunk
export const getAuthMeThunk = () => async (dispatch: any) => {
    let meData = await authAPI.authMe()
    if (meData.resultCode === ResultCodeEnum.Success) {
        let { id, email, login } = meData.data
        dispatch(setAuthUserDataAction(id, email, login, true))
    }
}

//  loginThunk
export const loginThunk = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let loginData = await authAPI.authLogin(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthMeThunk())
    } else {
        if (loginData.resultCode === ResultCodeEnum.Captcha) {
            dispatch(getCaptchaUrlThunk())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Error'
        dispatch(stopSubmit('loginForm', { _error: message }))
    }
}

//  logoutThunk
export const logoutThunk = () => async (dispatch: any) => {
    let response = await authAPI.authLogout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAction(null, null, null, false))
    }
}

//  getCaptchaUrlThunk
export const getCaptchaUrlThunk = () => async (dispatch: any) => {
    let response = await securityAPI.getCaptchaUrl()
    let captchaUrl = response.data.url
    dispatch(getCaptchaUrlAction(captchaUrl))
}

//  export default
export default authReducer
