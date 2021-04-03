import React from 'react';
import { UserType } from '../../types/types';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UserType>
    isFollowingProgress: Array<number>

    onPageChanged: (pageNumber: number) => void
    followThunk: (userId: number) => void
    unfollowThunk: (userId: number) => void
}

let Users: React.FC<UsersPropsType> = React.memo(({ totalUsersCount, pageSize, currentPage, onPageChanged, ...props }) => {
    return <div>
        <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} />
        <User users={props.users} isFollowingProgress={props.isFollowingProgress} unfollowThunk={props.unfollowThunk} followThunk={props.followThunk} />
    </div>
})

export default Users
