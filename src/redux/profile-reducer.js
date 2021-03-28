import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = 'social-network-ver1.0/profile/ADD_POST';
const SET_USER_PROFILE = 'social-network-ver1.0/profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'social-network-ver1.0/profile/SET_USER_STATUS';
const SET_PROFILE_PHOTO = 'social-network-ver1.0/profile/SET_PROFILE_PHOTO';
// const DELETE_POST = 'social-network-ver1.0/profile/DELETE_POST';

let initialState = {
    posts: [
        { id: 1, message: 'Hello, world!', likesCount: 0 },
        { id: 2, message: 'It\'s wonderful day', likesCount: 21 }
    ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 3,
                message: action.newPostText,
                likesCount: 0
            }
            return { ...state, posts: [...state.posts, newPost] }
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile }
        case SET_USER_STATUS:
            return { ...state, status: action.status }
        case SET_PROFILE_PHOTO:
            return { ...state, profile: { ...state.profile, photos: action.photos } }
        // case DELETE_POST:
        //     return { ...state, posts: state.posts.filter(p => p.id != action.postId) }
        default:
            return state;
    }
}

export const addPostCreator = (newPostText) => ({ type: ADD_POST, newPostText })
export const setUserProfileCreator = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setUserStatusCreator = (status) => ({ type: SET_USER_STATUS, status })
export const setProfilePhotoCreator = (photos) => ({ type: SET_PROFILE_PHOTO, photos })
// export const deletePostCreator = (postId) => ({ type: DELETE_POST, postId })

export const getUserProfileThunkCreator = (userId) => async (dispatch) => {
    const response = await usersAPI.getUserProfile(userId);
    dispatch(setUserProfileCreator(response.data));
}

export const getUserStatusThunkCreator = (userId) => async (dispatch) => {
    let response = await profileAPI.getUserStatus(userId);
    dispatch(setUserStatusCreator(response.data));
}

export const updateUserStatusThunkCreator = (status) => async (dispatch) => {
    let response = await profileAPI.updateUserStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatusCreator(status));
    }
}

export const savePhotoThunkCreator = (file) => async (dispatch) => {
    let response = await profileAPI.saveProfilePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(setProfilePhotoCreator(response.data.data.photos));
    }
}

export const saveProfileDataThunkCreator = (profile) => async (dispatch, getState) => {
    let userId = getState().auth.userId;
    let response = await profileAPI.saveProfileData(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfileThunkCreator(userId));
    } else {
        dispatch(stopSubmit('editProfileForm', { _error: response.data.messages[0] }));
        return Promise.reject(response.data.messages[0]);
    }
}

export default profileReducer
