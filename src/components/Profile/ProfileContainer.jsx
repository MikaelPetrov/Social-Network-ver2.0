import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Profile from './Profile';
import {
    getUserProfileThunk, getUserStatusThunk, updateUserStatusThunk, savePhotoThunk, saveProfileDataThunk
} from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from "redux";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

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

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}
let mapDispatchToProps = {
    getUserProfileThunk,
    getUserStatusThunk,
    updateUserStatusThunk,
    savePhotoThunk,
    saveProfileDataThunk
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
