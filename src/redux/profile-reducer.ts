import { InferActionsTypes, BaseThunkType } from './redux-store';
import { PhotosType, PostType, ProfileType } from '../types/types';
import { FormAction, stopSubmit } from "redux-form";
import { profileAPI } from '../api/profile-api';
import { ResultCodesEnum } from '../api/api';

//  profileInitialState and profileReducer
const profileInitialState = {
    posts: [
        { id: 1, message: 'Hello, world!', likesCount: 0 },
        { id: 2, message: 'It\'s wonderful day', likesCount: 21 }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '' as string
}

const profileReducer = (state = profileInitialState, action: ActionsType): ProfileInitialStateType => {
    switch (action.type) {
        case 'social-network-ver2.0/profile/ADD_POST':
            let newPost = {
                id: 3,
                message: action.newPostText,
                likesCount: 0
            }
            return { ...state, posts: [...state.posts, newPost] }
        case 'social-network-ver2.0/profile/SET_USER_PROFILE':
            return { ...state, profile: action.profile }
        case 'social-network-ver2.0/profile/SET_USER_STATUS':
            return { ...state, status: action.status }
        case 'social-network-ver2.0/profile/SET_PROFILE_PHOTO':
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }   //  photos: action.photos | maybe: ...action.photos
        case 'social-network-ver2.0/profile/DELETE_POST':
            return { ...state, posts: state.posts.filter(p => p.id !== action.postId) }
        default:
            return state
    }
}

//  actions
export const actions = {
    addPostAction: (newPostText: string) => ({ type: 'social-network-ver2.0/profile/ADD_POST', newPostText } as const),
    setUserProfileAction: (profile: ProfileType) => ({ type: 'social-network-ver2.0/profile/SET_USER_PROFILE', profile } as const),
    setUserStatusAction: (status: string) => ({ type: 'social-network-ver2.0/profile/SET_USER_STATUS', status } as const),
    setProfilePhotoAction: (photos: PhotosType) => ({ type: 'social-network-ver2.0/profile/SET_PROFILE_PHOTO', photos } as const),
    deletePostAction: (postId: number) => ({ type: 'social-network-ver2.0/profile/DELETE_POST', postId } as const)
}

//  getUserProfileThunk
export const getUserProfileThunk = (userId: number | null): ThunkType => async (dispatch) => {

    const data = await profileAPI.getUserProfile(userId)
    dispatch(actions.setUserProfileAction(data))
}

//  getUserStatusThunk
export const getUserStatusThunk = (userId: number | null): ThunkType => async (dispatch) => {

    let data = await profileAPI.getUserStatus(userId)
    dispatch(actions.setUserStatusAction(data))
}

//  updateUserStatusThunk
export const updateUserStatusThunk = (status: string): ThunkType => async (dispatch) => {

    let data = await profileAPI.updateUserStatus(status)

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setUserStatusAction(status))
    }
}

//  savePhotoThunk
export const savePhotoThunk = (file: File): ThunkType => async (dispatch) => {

    let data = await profileAPI.saveProfilePhoto(file)

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setProfilePhotoAction(data.data.photos))
    }
}

//  saveProfileDataThunk
export const saveProfileDataThunk = (profile: ProfileType): ThunkType => async (dispatch, getState) => {

    let userId = getState().auth.userId
    let data = await profileAPI.saveProfileData(profile)

    if (data.resultCode === ResultCodesEnum.Success) {
        if (userId != null) {
            dispatch(getUserProfileThunk(userId))
        } else {
            throw new Error('userId can\'t be null')
        }
    } else {
        dispatch(stopSubmit('editProfileForm', { _error: data.messages[0] }))
        return Promise.reject(data.messages[0])
    }
}

type ProfileInitialStateType = typeof profileInitialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

//  export default
export default profileReducer
