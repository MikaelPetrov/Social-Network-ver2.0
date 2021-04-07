import { ProfileType } from '../../types/types';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type PropsType = {
    isOwner: boolean
    profile: ProfileType | null
    status: string
    updateUserStatusThunk: (status: string) => void
    savePhotoThunk: (file: File) => void
    saveProfileDataThunk: (profile: ProfileType) => any
}

const Profile: React.FC<PropsType> = ({ isOwner, profile, status, updateUserStatusThunk, savePhotoThunk, saveProfileDataThunk }) => {
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
