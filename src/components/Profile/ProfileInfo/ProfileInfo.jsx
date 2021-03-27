import Preloader from '../../common/Preloader/Preloader';
import userNoImagePhoto from '../../../assets/Images/userNoImagePhoto.png';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatusWithHook';

const ProfileInfo = ({ profile, status, updateUserStatusThunkCreator, isOwner, savePhotoThunkCreator }) => {
    if (!profile) {
        return <Preloader />
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) { savePhotoThunkCreator(e.target.files[0]); }
    }
    return <div>
        <div className={s.descriptionBlock}>
            <img src={profile.photos.large || userNoImagePhoto} style={{ width: 'auto', height: 'auto' }} />
            {isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
            <ProfileStatus status={status} updateUserStatusThunkCreator={updateUserStatusThunkCreator} />
        </div>
    </div>
}

export default ProfileInfo
