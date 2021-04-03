import React from 'react';
import { connect } from 'react-redux';
import {
    getUsersThunk,
    followThunk,
    unfollowThunk
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import {
    currentPageSelector,
    isFetchingSelector,
    isFollowingProgressSelector,
    pageSizeSelector,
    totalUsersCountSelector,
    usersSelector
    /* usersPageReselect */
} from '../../redux/selectors/user-selectors';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    isFollowingProgress: Array<number>
}
type MapDispatchToPropsType = {
    getUsersThunk: (currentPage: number, pageSize: number) => void
    followThunk: (userId: number) => void
    unfollowThunk: (userId: number) => void
}
type OwnPropsType = {
    pageTitle: string
}
type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

class UsersContainer extends React.Component<UsersContainerPropsType> {

    componentDidMount() {
        const { currentPage, pageSize } = this.props
        this.props.getUsersThunk(currentPage, pageSize)
    }
    onPageChanged = (pageNumber: number) => {
        const { pageSize } = this.props
        this.props.getUsersThunk(pageNumber, pageSize)
    }

    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader /> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                followThunk={this.props.followThunk}
                unfollowThunk={this.props.unfollowThunk}
                isFollowingProgress={this.props.isFollowingProgress} />
        </>
    }

}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: usersSelector(state),
        pageSize: pageSizeSelector(state),
        totalUsersCount: totalUsersCountSelector(state),
        currentPage: currentPageSelector(state),
        isFetching: isFetchingSelector(state),
        isFollowingProgress: isFollowingProgressSelector(state)
        // users: usersPageReselect(state)
    }
}
let mapDispatchToProps: MapDispatchToPropsType = {
    getUsersThunk,
    followThunk,
    unfollowThunk
}

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(UsersContainer)
