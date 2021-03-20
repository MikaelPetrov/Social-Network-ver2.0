import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "4f060539-4f34-488d-9829-06d708667488"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 100) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
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
    },
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
}
export const authAPI = {
    authMe() {
        return instance
            .get(`auth/me`)
    }
}