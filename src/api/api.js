import * as axios from "axios";

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
    followProcess(userId) {
        return instance
            .post(`follow/${userId}`)
    },
    unfollowProcess(userId) {
        return instance
            .delete(`follow/${userId}`)
    },
    getUserProfile(userId) {
        return profileAPI.getUserProfile(userId)
    }
}

export const profileAPI = {
    getUserProfile(userId) {
        return instance
            .get(`profile/` + userId)
    },
    getUserStatus(userId) {
        return instance
            .get(`profile/status/` + userId)
    },
    updateUserStatus(status) {
        return instance
            .put(`profile/status`, { status: status })
    },
    saveProfilePhoto(photoFile) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance
            .put(`profile/photo`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    },
    saveProfileData(profile) {
        return instance
            .put(`profile`, profile)
    }
}

export const authAPI = {
    authMe() {
        return instance
            .get(`auth/me`)
    },
    authLogin(email, password, rememberMe = false, captcha = null) {
        return instance
            .post(`auth/login`, { email, password, rememberMe, captcha })
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
