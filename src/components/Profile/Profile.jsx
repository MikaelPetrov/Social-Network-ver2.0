import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = ({ profile, status, updateUserStatusThunkCreator }) => {
    return <div>
        <ProfileInfo
            profile={profile}
            status={status}
            updateUserStatusThunkCreator={updateUserStatusThunkCreator} />
        <MyPostsContainer />
    </div>
}

export default Profile