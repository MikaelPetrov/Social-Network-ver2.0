import Preloader from '../../common/Preloader/Preloader';
import userNoImagePhoto from '../../../assets/Images/userNoImagePhoto.png';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatusWithHook';
import { useState } from 'react';
import ProfileDataReduxForm from './ProfileDataForm';

const ProfileInfo = ({ profile, status, updateUserStatusThunkCreator, isOwner, savePhotoThunkCreator, saveProfileDataThunkCreator }) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) { savePhotoThunkCreator(e.target.files[0]); }
    }
    const onSubmit = (formData) => {
        saveProfileDataThunkCreator(formData).then(() => {
            setEditMode(false);
        })
    }

    return <div>
        <div className={s.descriptionBlock}>
            <img src={profile.photos.large || userNoImagePhoto} style={{ width: '200px', height: 'auto' }} />
            {isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
            {editMode
                ? <ProfileDataReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                : <ProfileData goToEditMode={() => { setEditMode(true) }} profile={profile} isOwner={isOwner} />}
            <ProfileStatus status={status} updateUserStatusThunkCreator={updateUserStatusThunkCreator} />
        </div>
    </div>

}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
    return <div>
        {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
        <div>
            <b>Full name:</b> {profile.fullName}
        </div>
        <div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob &&
            <div>
                <b>My professional skills:</b> {profile.lookingForAJobDescription}
            </div>
        }
        <div>
            <b>About me:</b> {profile.aboutMe}
        </div>
        <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })}
        </div>
    </div>
}

const Contact = ({ contactTitle, contactValue }) => {
    return <div className={s.contact}><b>{contactTitle}:</b> {contactValue}</div>
}

export default ProfileInfo
