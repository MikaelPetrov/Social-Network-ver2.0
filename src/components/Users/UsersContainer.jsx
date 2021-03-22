import React from 'react';
import { connect } from 'react-redux';
import {
    getUsersThunkCreator,
    followThunkCreator,
    unfollowThunkCreator,
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { currentPageSelector, isFetchingSelector, isFollowingProgressSelector, pageSizeSelector, totalCountUsersSelector, usersSelector } from '../../redux/selectors/user-selectors';


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }
    onPageChanged = (pageNumber) => {
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users
                totalCountUsers={this.props.totalCountUsers}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                followThunkCreator={this.props.followThunkCreator}
                unfollowThunkCreator={this.props.unfollowThunkCreator}
                toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                isFollowingProgress={this.props.isFollowingProgress}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: usersSelector(state),
        pageSize: pageSizeSelector(state),
        totalCountUsers: totalCountUsersSelector(state),
        currentPage: currentPageSelector(state),
        isFetching: isFetchingSelector(state),
        isFollowingProgress: isFollowingProgressSelector(state),
    }
}
let mapDispatchToProps = {
    getUsersThunkCreator,
    followThunkCreator,
    unfollowThunkCreator,
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(UsersContainer);