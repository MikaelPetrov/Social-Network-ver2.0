import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';


const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return <div>
        <div>
            <img src='https://pixelz.cc/wp-content/uploads/2019/03/chicago-skyline-dual-monitor-wallpaper.jpg'></img>
        </div>
        <div className={s.descriptionBlock}>
            <img src={props.profile.photos.large} style={{ width: '10%' }} />
                Ava + description
            </div>
    </div>
}

export default ProfileInfo;