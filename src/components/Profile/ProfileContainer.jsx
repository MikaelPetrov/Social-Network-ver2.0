import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Profile from './Profile';
import {
    getUserProfileThunkCreator,
} from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';


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

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
})

let mapDispatchToProps = {
    getUserProfileThunkCreator,
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect,
)(ProfileContainer);