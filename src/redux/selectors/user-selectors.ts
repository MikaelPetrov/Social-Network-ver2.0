// import { createSelector } from 'reselect';
import { AppStateType } from "../redux-store"

export const usersSelector = (state: AppStateType) => {
    return state.usersPage.users
}

export const pageSizeSelector = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const totalUsersCountSelector = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const currentPageSelector = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const isFetchingSelector = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const isFollowingProgressSelector = (state: AppStateType) => {
    return state.usersPage.isFollowingProgress
}

// export const usersPageReselect = createSelector(            /* Super Selector */
//     /* usersSelector,
//     /* isFetchingSelector,
//     /* (users, isFetching) => {
//         /* for example: return users.filter(u => true)
//     /* })

// export const selectorProblems = (state) => {
//     /* debugger - works at every mstp */
//     /* let count = 23; return count - works at every mstp */
//     /* return state.usersPage.users.filter(u => true) - works at every mstp and rerender occurs */
// }
