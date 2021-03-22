export const usersSelector = (state) => {
    return state.usersPage.users
}

export const pageSizeSelector = (state) => {
    return state.usersPage.pageSize
}

export const totalCountUsersSelector = (state) => {
    return state.usersPage.totalCountUsers
}

export const currentPageSelector = (state) => {
    return state.usersPage.currentPage
}

export const isFetchingSelector = (state) => {
    return state.usersPage.isFetching
}

export const isFollowingProgressSelector = (state) => {
    return state.usersPage.isFollowingProgress
}

// export const selectorProblems = (state) => {
//     /* debugger - works at every mstp */
//     /* let count = 23; return count - works at every mstp */
//     /* return state.usersPage.users.filter(u => true) - works at every mstp and rerender occurs */
// }