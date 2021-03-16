import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as axios from 'axios';
import Profile from './Profile';
import { setUserProfile } from '../../redux/profile-reducer';


class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.setUserProfile(response.data);
            });
    }

    render() {
        return <div>
            < Profile {...this.props} profile={this.props.profile} />
        </div >
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
})
let mapDispatchToProps = {
    setUserProfile,
}
let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, mapDispatchToProps)(WithUrlDataContainerComponent);