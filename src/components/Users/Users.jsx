import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

let Users = React.memo(({ totalCountUsers, pageSize, currentPage, onPageChanged, ...props }) => {
    return <div>
        <Paginator totalItemsCount={totalCountUsers} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} />
        <User users={props.users} isFollowingProgress={props.isFollowingProgress} unfollowThunk={props.unfollowThunk} followThunk={props.followThunk} />
    </div>
})

export default Users
