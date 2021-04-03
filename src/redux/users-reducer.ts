import { UserType } from './../types/types';
import { usersAPI } from '../api/api';
import { updateObjectInArray } from '../utils/object-helper';

const FOLLOW = 'social-network-ver2.0/users/FOLLOW'
const UNFOLLOW = 'social-network-ver2.0/users/UNFOLLOW'
const SET_USERS = 'social-network-ver2.0/users/SET_USERS'
const SET_CURRENT_PAGE = 'social-network-ver2.0/users/SET_CURRENT_PAGE'
const SET_TOTAL_COUNT_USERS = 'social-network-ver2.0/users/SET_TOTAL_COUNT_USERS'
const TOGGLE_IS_FETCHING = 'social-network-ver2.0/users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'social-network-ver2.0/users/TOGGLE_IS_FOLLOWING_PROGRESS'

//  usersInitialState and usersReducer
type usersInitialStateType = typeof usersInitialState

let usersInitialState = {
    users: [] as Array<UserType>,
    pageSize: 100 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    isFollowingProgress: [] as Array<number>
}

const usersReducer = (state = usersInitialState, action: any): usersInitialStateType => {
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
            return { ...state, totalUsersCount: action.count }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                isFollowingProgress: action.isFetching
                    ? [...state.isFollowingProgress, action.userId]
                    : state.isFollowingProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

//  followAction
type FollowActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followAction = (userId: number): FollowActionType => ({ type: FOLLOW, userId })

//  unfollowAction
type UnfollowActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowAction = (userId: number): UnfollowActionType => ({ type: UNFOLLOW, userId })

//  setUsersAction
type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsersAction = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users })

//  setCurrentPageAction
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPageAction = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage })

//  setTotalUsersCountAction
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_COUNT_USERS
    count: number
}
export const setTotalUsersCountAction = (totalUsersCount: number): SetTotalUsersCountActionType => ({ type: SET_TOTAL_COUNT_USERS, count: totalUsersCount })

//  toggleIsFetchingAction
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetchingAction = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })

//  toggleIsFollowingProgressAction
type ToggleIsFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleIsFollowingProgressAction = (isFetching: boolean, userId: number): ToggleIsFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId
})

//  getUsersThunk
export const getUsersThunk = (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetchingAction(true))
    dispatch(setCurrentPageAction(page))
    let data = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetchingAction(false))
    dispatch(setUsersAction(data.items))
    dispatch(setTotalUsersCountAction(data.totalCount))
}

//  followUnfollowFlow
export const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, ActionCreator: any) => {
    dispatch(toggleIsFollowingProgressAction(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(ActionCreator(userId))
    }
    dispatch(toggleIsFollowingProgressAction(false, userId))
}

//  followThunk
export const followThunk = (userId: number) => async (dispatch: any) => { followUnfollowFlow(dispatch, userId, usersAPI.followProcess.bind(usersAPI), followAction) }

//  unfollowThunk
export const unfollowThunk = (userId: number) => async (dispatch: any) => { followUnfollowFlow(dispatch, userId, usersAPI.unfollowProcess.bind(usersAPI), unfollowAction) }

//  export default
export default usersReducer
