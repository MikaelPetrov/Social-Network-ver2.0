import { usersAPI } from '../api/api';
import { updateObjectInArray } from '../utils/object-helper';

const FOLLOW = 'social-network-ver1.0/users/FOLLOW';
const UNFOLLOW = 'social-network-ver1.0/users/UNFOLLOW';
const SET_USERS = 'social-network-ver1.0/users/SET_USERS';
const SET_CURRENT_PAGE = 'social-network-ver1.0/users/SET_CURRENT_PAGE';
const SET_TOTAL_COUNT_USERS = 'social-network-ver1.0/users/SET_TOTAL_COUNT_USERS';
const TOGGLE_IS_FETCHING = 'social-network-ver1.0/users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'social-network-ver1.0/users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 100,
    totalCountUsers: 0,
    currentPage: 1,
    isFetching: false,
    isFollowingProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return { ...state, users: updateObjectInArray(state.users, action.userId, 'id', { followed: true }) }
        case UNFOLLOW:
            return { ...state, users: updateObjectInArray(state.users, action.userId, 'id', { followed: false }) }
        case SET_USERS:
            return { ...state, users: action.users }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }
        case SET_TOTAL_COUNT_USERS:
            return { ...state, totalCountUsers: action.count }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                isFollowingProgress: action.isFetching
                    ? [...state.isFollowingProgress, action.userId]
                    : state.isFollowingProgress.filter(id => id != action.userId)
            }
        default:
            return state;
    }
}

export const followSuccess = (userId) => ({ type: FOLLOW, userId })
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalCountUsers = (totalCountUsers) => ({ type: SET_TOTAL_COUNT_USERS, count: totalCountUsers })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleIsFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

export const getUsersThunkCreator = (page, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));
    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalCountUsers(data.totalCount));
}

export const followUnfollowFlow = async (dispatch, userId, apiMethod, ActionCreator) => {
    dispatch(toggleIsFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(ActionCreator(userId));
    }
    dispatch(toggleIsFollowingProgress(false, userId));
}

export const followThunkCreator = (userId) => async (dispatch) => { followUnfollowFlow(dispatch, userId, usersAPI.followProcess.bind(usersAPI), followSuccess) }

export const unfollowThunkCreator = (userId) => async (dispatch) => { followUnfollowFlow(dispatch, userId, usersAPI.unfollowProcess.bind(usersAPI), unfollowSuccess) }

export default usersReducer
