import { InjectedFormProps, reduxForm } from 'redux-form';
import { createField, GetStringKeys, Input, TextArea } from '../../common/FormControl/FormControl';
import s from './ProfileInfo.module.css';
import styles from '../../common/FormControl/FormControl.module.css';
import { ProfileType } from '../../../types/types';

type PropsType = {
    profile: ProfileType
}
type ProfileFormKeysType = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <button>Save</button>
        </div>
        {error && <div className={styles.formSummaryError}>
            {error}
        </div>}
        <div>
            <b>Full name:</b> {createField<ProfileFormKeysType>('Full name', 'fullName', Input, [])}
        </div>
        <div>
            <b>Looking for a job:</b> {createField<ProfileFormKeysType>('Looking for a job', 'lookingForAJob', Input, [], { type: 'checkbox' })}
        </div>
        <div>
            <b>My professional skills:</b> {createField<ProfileFormKeysType>('My professional skills', 'lookingForAJobDescription', TextArea, [])}
        </div>
        <div>
            <b>About me:</b> {createField<ProfileFormKeysType>('About me', 'aboutMe', TextArea, [])}
        </div>
        <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contact}>
                    <b>{key}: {createField(key, 'contacts.' + key, Input, [])} </b>
                </div>
            })}
        </div>
    </form>
}

const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({ form: 'editProfileForm' })(ProfileDataForm)
export default ProfileDataReduxForm
