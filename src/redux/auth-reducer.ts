import { InferActionsTypes, BaseThunkType } from './redux-store';
import { FormAction, stopSubmit } from "redux-form";
import { ResultCodesEnum } from '../api/api';
import { authAPI } from '../api/auth-api';
import { securityAPI } from '../api/security-api';

//  authInitialState and authReducer
const authInitialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

const authReducer = (state = authInitialState, action: ActionsType): AuthInitialStateType => {
    switch (action.type) {
        case 'social-network-ver2.0/auth/SET_AUTH_USER_DATA':
        case 'social-network-ver2.0/auth/GET_CAPTCHA_URL':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

//  actions
export const actions = {
    setAuthUserDataAction: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'social-network-ver2.0/auth/SET_AUTH_USER_DATA', payload: { userId, email, login, isAuth }
    } as const),
    getCaptchaUrlAction: (captchaUrl: string) => ({
        type: 'social-network-ver2.0/auth/GET_CAPTCHA_URL', payload: { captchaUrl }
    } as const)
}

//  getAuthMeThunk
export const getAuthMeThunk = (): ThunkType => async (dispatch) => {

    let data = await authAPI.authMe()

    if (data.resultCode === ResultCodesEnum.Success) {
        let { id, email, login } = data.data
        dispatch(actions.setAuthUserDataAction(id, email, login, true))
    }
}

//  loginThunk
export const loginThunk = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {

    let data = await authAPI.authLogin(email, password, rememberMe, captcha)

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthMeThunk())
    } else {
        if (data.resultCode === ResultCodesEnum.Captcha) {
            dispatch(getCaptchaUrlThunk())
        }
        let message = data.messages.length > 0 ? data.messages[0] : 'Error'
        dispatch(stopSubmit('loginForm', { _error: message }))
    }
}

//  logoutThunk
export const logoutThunk = (): ThunkType => async (dispatch) => {

    let response = await authAPI.authLogout()

    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserDataAction(null, null, null, false))
    }
}

//  getCaptchaUrlThunk
export const getCaptchaUrlThunk = (): ThunkType => async (dispatch) => {

    let data = await securityAPI.getCaptchaUrl()
    let captchaUrl = data.url
    dispatch(actions.getCaptchaUrlAction(captchaUrl))
}

type AuthInitialStateType = typeof authInitialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

//  export default
export default authReducer
