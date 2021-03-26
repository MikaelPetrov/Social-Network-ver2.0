import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatusWithHook';

const ProfileInfo = ({ profile, status, updateUserStatusThunkCreator }) => {
    if (!profile) {
        return <Preloader />
    }
    return <div>
        <div className={s.descriptionBlock}>
            <img src={profile.photos.large} style={{ width: '10%' }} />
            <ProfileStatus status={status} updateUserStatusThunkCreator={updateUserStatusThunkCreator} />
        </div>
    </div>
}

export default ProfileInfo