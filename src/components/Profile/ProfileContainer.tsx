import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import Profile from './Profile';
import {
    getUserProfileThunk,
    getUserStatusThunk,
    updateUserStatusThunk,
    savePhotoThunk,
    saveProfileDataThunk
} from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from "redux";
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';

type StatePropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}
type DispatchPropsType = {
    getUserProfileThunk: (userId: number | null) => void
    getUserStatusThunk: (userId: number | null) => void
    updateUserStatusThunk: (status: string) => void
    savePhotoThunk: (file: File) => void
    saveProfileDataThunk: (profile: ProfileType) => any
}
type PathParamsType = {
    userId: string
}
export type ProfilePropsType = StatePropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<ProfilePropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
            // userId = 15828;
        }
        this.props.getUserProfileThunk(userId)
        this.props.getUserStatusThunk(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: ProfilePropsType, prevState: ProfilePropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    componentWillUnmount(): void { }

    render() {
        return < Profile {...this.props}
            isOwner={!this.props.match.params.userId}
            profile={this.props.profile}
            status={this.props.status}
            updateUserStatusThunk={this.props.updateUserStatusThunk}
            savePhotoThunk={this.props.savePhotoThunk}
            saveProfileDataThunk={this.props.saveProfileDataThunk} />
    }
}

const mapStateToProps = (state: AppStateType): StatePropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}
const mapDispatchToProps: DispatchPropsType = {
    getUserProfileThunk,
    getUserStatusThunk,
    updateUserStatusThunk,
    savePhotoThunk,
    saveProfileDataThunk
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
