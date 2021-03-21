import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

let initialState = {
    posts: [
        { id: 1, message: 'Hello, world!', likesCount: 0 },
        { id: 2, message: 'It\'s wonderful day', likesCount: 21 }
    ],
    profile: null,
    status: '',
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 3,
                message: action.newPostText,
                likesCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile,
            }
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status,
            }
        }
        default:
            return state;
    }
}

export const addPostCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfileCreator = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setUserStatusCreator = (status) => ({ type: SET_USER_STATUS, status });

export const getUserProfileThunkCreator = (userId) => (dispatch) => {
    usersAPI.getUserProfile(userId)
        .then(response => {
            dispatch(setUserProfileCreator(response.data));
        });
}
export const getUserStatusThunkCreator = (userId) => (dispatch) => {
    profileAPI.getUserStatus(userId)
        .then(response => {
            dispatch(setUserStatusCreator(response.data));
        });
}
export const updateUserStatusThunkCreator = (status) => (dispatch) => {
    profileAPI.updateUserStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserStatusCreator(status));
            }
        });
}

export default profileReducer;