import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = ({ isOwner, profile, status, updateUserStatusThunkCreator, savePhotoThunkCreator }) => {
    return <div>
        <ProfileInfo
            isOwner={isOwner}
            profile={profile}
            status={status}
            updateUserStatusThunkCreator={updateUserStatusThunkCreator}
            savePhotoThunkCreator={savePhotoThunkCreator} />
        <MyPostsContainer />
    </div>
}

export default Profile
