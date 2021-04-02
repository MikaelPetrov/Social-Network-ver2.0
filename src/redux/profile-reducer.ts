import { PhotoType, PostType, ProfileType } from './../types/types';
import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from '../api/api';

const ADD_POST = 'social-network-ver2.0/profile/ADD_POST'
const SET_USER_PROFILE = 'social-network-ver2.0/profile/SET_USER_PROFILE'
const SET_USER_STATUS = 'social-network-ver2.0/profile/SET_USER_STATUS'
const SET_PROFILE_PHOTO = 'social-network-ver2.0/profile/SET_PROFILE_PHOTO'
const DELETE_POST = 'social-network-ver2.0/profile/DELETE_POST'

//  profileInitialState and profileReducer
type ProfileInitialStateType = typeof profileInitialState

let profileInitialState = {
    posts: [
        { id: 1, message: 'Hello, world!', likesCount: 0 },
        { id: 2, message: 'It\'s wonderful day', likesCount: 21 }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '' as string,
    newPostText: '' as string
}

const profileReducer = (state = profileInitialState, action: any): ProfileInitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 3,
                message: action.newPostText,
                likesCount: 0
            }
            return { ...state, posts: [...state.posts, newPost], newPostText: '' }
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile }
        case SET_USER_STATUS:
            return { ...state, status: action.status }
        case SET_PROFILE_PHOTO:
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }   //  photos: action.photos | maybe: ...action.photos
        case DELETE_POST:
            return { ...state, posts: state.posts.filter(p => p.id !== action.postId) }
        default:
            return state
    }
}

//  addPostAction
type AddPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostAction = (newPostText: string): AddPostActionType => ({ type: ADD_POST, newPostText })

//  setUserProfileAction
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType | null
}
export const setUserProfileAction = (profile: ProfileType | null): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile })

//  setUserStatusAction
type SetUserStatusActionType = {
    type: typeof SET_USER_STATUS
    status: string
}
export const setUserStatusAction = (status: string): SetUserStatusActionType => ({ type: SET_USER_STATUS, status })

//  setProfilePhotoAction
type SetProfilePhotoActionType = {
    type: typeof SET_PROFILE_PHOTO
    photos: PhotoType
}
export const setProfilePhotoAction = (photos: PhotoType): SetProfilePhotoActionType => ({ type: SET_PROFILE_PHOTO, photos })

//  deletePostAction
type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePostAction = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId })

//  getUserProfileThunk
export const getUserProfileThunk = (userId: number | null) => async (dispatch: any) => {
    const response = await usersAPI.getUserProfile(userId)
    dispatch(setUserProfileAction(response.data))
}

//  getUserStatusThunk
export const getUserStatusThunk = (userId: number | null) => async (dispatch: any) => {
    let response = await profileAPI.getUserStatus(userId)
    dispatch(setUserStatusAction(response.data))
}

//  updateUserStatusThunk
export const updateUserStatusThunk = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateUserStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setUserStatusAction(status))
    }
}

//  savePhotoThunk
export const savePhotoThunk = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.saveProfilePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(setProfilePhotoAction(response.data.data.photos))
    }
}

//  saveProfileDataThunk
export const saveProfileDataThunk = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    let userId = getState().auth.userId
    let response = await profileAPI.saveProfileData(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfileThunk(userId))
    } else {
        dispatch(stopSubmit('editProfileForm', { _error: response.data.messages[0] }))
        return Promise.reject(response.data.messages[0])
    }
}

//  export default
export default profileReducer
