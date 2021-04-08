import { APIResponseType, ResultCodesEnum } from '../api/api';
import { UserType } from '../types/types';
import { updateObjectInArray } from '../utils/object-helper';
import { InferActionsTypes, BaseThunkType } from './redux-store';
import { usersAPI } from '../api/users-api';
import { Dispatch } from 'react';

//  usersInitialState and usersReducer
const usersInitialState = {
    users: [] as Array<UserType>,
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowingProgress: [] as Array<number>
}

const usersReducer = (state = usersInitialState, action: ActionsType): UsersInitialStateType => {
    switch (action.type) {
        case 'social-network-ver2.0/users/FOLLOW':
            return { ...state, users: updateObjectInArray(state.users, action.userId, 'id', { followed: true }) }
        case 'social-network-ver2.0/users/UNFOLLOW':
            return { ...state, users: updateObjectInArray(state.users, action.userId, 'id', { followed: false }) }
        case 'social-network-ver2.0/users/SET_USERS':
            return { ...state, users: action.users }
        case 'social-network-ver2.0/users/SET_CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage }
        case 'social-network-ver2.0/users/SET_TOTAL_COUNT_USERS':
            return { ...state, totalUsersCount: action.count }
        case 'social-network-ver2.0/users/TOGGLE_IS_FETCHING':
            return { ...state, isFetching: action.isFetching }
        case 'social-network-ver2.0/users/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state, isFollowingProgress: action.isFetching
                    ? [...state.isFollowingProgress, action.userId]
                    : state.isFollowingProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

//  actions
export const actions = {
    followAction: (userId: number) => ({ type: 'social-network-ver2.0/users/FOLLOW', userId } as const),
    unfollowAction: (userId: number) => ({ type: 'social-network-ver2.0/users/UNFOLLOW', userId } as const),
    setUsersAction: (users: Array<UserType>) => ({ type: 'social-network-ver2.0/users/SET_USERS', users } as const),
    setCurrentPageAction: (currentPage: number) => ({ type: 'social-network-ver2.0/users/SET_CURRENT_PAGE', currentPage } as const),
    setTotalUsersCountAction: (totalUsersCount: number) => ({ type: 'social-network-ver2.0/users/SET_TOTAL_COUNT_USERS', count: totalUsersCount } as const),
    toggleIsFetchingAction: (isFetching: boolean) => ({ type: 'social-network-ver2.0/users/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleIsFollowingProgressAction: (isFetching: boolean, userId: number) => ({ type: 'social-network-ver2.0/users/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
}

//  getUsersThunk
export const getUsersThunk = (page: number, pageSize: number): ThunkType => async (dispatch) => {

    dispatch(actions.toggleIsFetchingAction(true))
    dispatch(actions.setCurrentPageAction(page))

    let data = await usersAPI.getUsers(page, pageSize)
    dispatch(actions.toggleIsFetchingAction(false))
    dispatch(actions.setUsersAction(data.items))
    dispatch(actions.setTotalUsersCountAction(data.totalCount))
}

//  _followUnfollowFlow
const _followUnfollowFlow = async (dispatch: Dispatch<ActionsType>, userId: number, apiMethod: (userId: number) => Promise<APIResponseType>, actionCreator: (userId: number) => ActionsType) => {

    dispatch(actions.toggleIsFollowingProgressAction(true, userId))

    let response = await apiMethod(userId)
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleIsFollowingProgressAction(false, userId))
}

//  followThunk
export const followThunk = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.followProcess.bind(usersAPI), actions.followAction)
}

//  unfollowThunk
export const unfollowThunk = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.unfollowProcess.bind(usersAPI), actions.unfollowAction)
}

type UsersInitialStateType = typeof usersInitialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

//  export default
export default usersReducer
