import { instance, GetItemsType, APIResponseType } from './api';

export const usersAPI = {

    async getUsers(currentPage = 1, pageSize = 100) {
        const res = await instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`);
        return res.data;
    },

    async followProcess(userId: number) {
        const res = await instance.post<APIResponseType>(`follow/${userId}`);
        return res.data;
    },

    async unfollowProcess(userId: number) {
        const res = await instance.delete<APIResponseType>(`follow/${userId}`);
        return res.data;
    }
}
