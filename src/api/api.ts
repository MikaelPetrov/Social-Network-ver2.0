import { ProfileType } from './../types/types';
import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "181fcfa2-8005-4441-8687-690857f64704"
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 100) {
        return instance
            .get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    followProcess(userId: number | null) {
        return instance
            .post(`follow/${userId}`)
    },
    unfollowProcess(userId: number | null) {
        return instance
            .delete(`follow/${userId}`)
    },
    getUserProfile(userId: number | null) {
        return profileAPI.getUserProfile(userId)
    }
}

export const profileAPI = {
    getUserProfile(userId: number | null) {
        return instance
            .get(`profile/` + userId)
    },
    getUserStatus(userId: number | null) {
        return instance
            .get(`profile/status/` + userId)
    },
    updateUserStatus(status: string) {
        return instance
            .put(`profile/status`, { status: status })
    },
    saveProfilePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance
            .put(`profile/photo`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    },
    saveProfileData(profile: ProfileType) {
        return instance
            .put(`profile`, profile)
    }
}

export const authAPI = {
    authMe() {
        return instance
            .get<MeResponseType>(`auth/me`)
            .then(response => response.data)
    },
    authLogin(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance
            .post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
            .then(response => response.data)
    },
    authLogout() {
        return instance
            .delete(`auth/login`)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance
            .get(`security/get-captcha-url`)
    }
}

//  MeResponseType, LoginResponseType and enum
type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    Captcha = 10
}
