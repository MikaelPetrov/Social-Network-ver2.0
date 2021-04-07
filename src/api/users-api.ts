import { instance, GetItemsType, APIResponseType } from './api';

export const usersAPI = {

    async getUsers(currentPage = 1, pageSize = 100) {
        const res = await instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`);
        return res.data;
    },

    followProcess(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`)
    },

    unfollowProcess(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`)
    }
}
