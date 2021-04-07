import { ProfileType, PhotosType } from '../types/types';
import { instance, APIResponseType } from './api';

type SavePhotoResponseType = {
    photos: PhotosType
}

export const profileAPI = {

    async getUserProfile(userId: number | null) {
        const res = await instance.get<ProfileType>(`profile/` + userId);
        return res.data;
    },

    async getUserStatus(userId: number | null) {
        const res = await instance.get<string>(`profile/status/` + userId);
        return res.data;
    },

    async updateUserStatus(status: string) {
        const res = await instance.put<APIResponseType>(`profile/status`, { status: status });
        return res.data;
    },

    async saveProfilePhoto(photoFile: File) {

        const formData = new FormData()
        formData.append('image', photoFile)

        const res = await instance.put<APIResponseType<SavePhotoResponseType>>(`profile/photo`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        return res.data;
    },

    async saveProfileData(profile: ProfileType) {
        const res = await instance.put<APIResponseType>(`profile`, profile);
        return res.data;
    }
}
