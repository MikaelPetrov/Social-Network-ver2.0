import { UserType } from './../types/types';
import { usersAPI } from '../api/api';
import { updateObjectInArray } from '../utils/object-helper';
import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { AppStateType, InferActionsTypes } from './redux-store';

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
        case 'FOLLOW':
            return { ...state, users: updateObjectInArray(state.users, action.userId, 'id', { followed: true }) }
        case 'UNFOLLOW':
            return { ...state, users: updateObjectInArray(state.users, action.userId, 'id', { followed: false }) }
        case 'SET_USERS':
            return { ...state, users: action.users }
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage }
        case 'SET_TOTAL_COUNT_USERS':
            return { ...state, totalUsersCount: action.count }
        case 'TOGGLE_IS_FETCHING':
            return { ...state, isFetching: action.isFetching }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
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

//  actions
export const actions = {
    followAction: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollowAction: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsersAction: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
    setCurrentPageAction: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setTotalUsersCountAction: (totalUsersCount: number) => ({ type: 'SET_TOTAL_COUNT_USERS', count: totalUsersCount } as const),
    toggleIsFetchingAction: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
    toggleIsFollowingProgressAction: (isFetching: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
}

//  ActionsTypes (summary users actions types), DispatchType, ThunkType and GetStateType
type ActionsTypes = InferActionsTypes<typeof actions>
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
type GetStateType = () => AppStateType

//  getUsersThunk
export const getUsersThunk = (page: number, pageSize: number): ThunkType => async (dispatch, getState) => {
    dispatch(actions.toggleIsFetchingAction(true))
    dispatch(actions.setCurrentPageAction(page))
    let data = await usersAPI.getUsers(page, pageSize)
    dispatch(actions.toggleIsFetchingAction(false))
    dispatch(actions.setUsersAction(data.items))
    dispatch(actions.setTotalUsersCountAction(data.totalCount))
}

//  _followUnfollowFlow
export const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, ActionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleIsFollowingProgressAction(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(ActionCreator(userId))
    }
    dispatch(actions.toggleIsFollowingProgressAction(false, userId))
}

//  followThunk
export const followThunk = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.followProcess.bind(usersAPI), actions.followAction)
}

//  unfollowThunk
export const unfollowThunk = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollowProcess.bind(usersAPI), actions.unfollowAction)
}

//  export default
export default usersReducer
