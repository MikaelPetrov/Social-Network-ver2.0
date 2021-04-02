import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = ({ isOwner, profile, status, updateUserStatusThunk, savePhotoThunk, saveProfileDataThunk }) => {
    return <div>
        <ProfileInfo
            isOwner={isOwner}
            profile={profile}
            status={status}
            updateUserStatusThunk={updateUserStatusThunk}
            savePhotoThunk={savePhotoThunk}
            saveProfileDataThunk={saveProfileDataThunk} />
        <MyPostsContainer />
    </div>
}

export default Profile
