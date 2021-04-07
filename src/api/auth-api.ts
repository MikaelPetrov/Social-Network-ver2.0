import { instance, ResultCodesEnum, APIResponseType } from './api';

type MeResponseType = {
    id: number
    email: string
    login: string
}
type LoginResponseType = {
    userId: number
}

export const authAPI = {

    async authMe() {
        const res = await instance.get<APIResponseType<MeResponseType, ResultCodesEnum>>(`auth/me`);
        return res.data;
    },

    async authLogin(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        const res = await instance.post<APIResponseType<LoginResponseType, ResultCodesEnum>>(`auth/login`, { email, password, rememberMe, captcha });
        return res.data;
    },

    authLogout() {
        return instance.delete(`auth/login`)
    }
}
