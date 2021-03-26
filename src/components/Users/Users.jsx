import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

let Users = React.memo(({ totalCountUsers, pageSize, currentPage, onPageChanged, ...props }) => {
    return <div>
        <Paginator totalCountUsers={totalCountUsers} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} />
        <User users={props.users} isFollowingProgress={props.isFollowingProgress} unfollowThunkCreator={props.unfollowThunkCreator} followThunkCreator={props.followThunkCreator} />
    </div>
})

export default Users