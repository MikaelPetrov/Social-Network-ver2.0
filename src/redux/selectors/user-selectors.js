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