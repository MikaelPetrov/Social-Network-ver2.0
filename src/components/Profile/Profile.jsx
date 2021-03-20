import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';


const Profile = (props) => {
    return <div>
        <ProfileInfo
            profile={props.profile}
            status={props.status}
            updateUserStatusThunkCreator={props.updateUserStatusThunkCreator} />
        <MyPostsContainer />
    </div>
}

export default Profile;