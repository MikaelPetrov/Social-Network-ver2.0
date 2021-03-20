import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import Profile from './Profile';
import {
    getUserProfileThunkCreator,
} from '../../redux/profile-reducer';


class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 15828;
        }
        this.props.getUserProfileThunkCreator(userId);
    }

    render() {
        if (!this.props.isAuth) { return <Redirect to={'/login'} /> }

        return <div>
            < Profile {...this.props} profile={this.props.profile} />
        </div >
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
})
let mapDispatchToProps = {
    getUserProfileThunkCreator,
}
let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, mapDispatchToProps)(WithUrlDataContainerComponent);