import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Profile from './Profile';
import {
    getUserProfileThunkCreator,
} from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 15828;
        }
        this.props.getUserProfileThunkCreator(userId);
    }

    render() {
        return < Profile {...this.props} profile={this.props.profile} />
    }
}

let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
})

let mapDispatchToProps = {
    getUserProfileThunkCreator,
}

let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

export default connect(mapStateToProps, mapDispatchToProps)(WithUrlDataContainerComponent);