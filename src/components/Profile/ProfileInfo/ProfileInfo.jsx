import s from './ProfileInfo.module.css';


const ProfileInfo = () => {
    return <div>
        <div>
            <img src='https://pixelz.cc/wp-content/uploads/2019/03/chicago-skyline-dual-monitor-wallpaper.jpg'></img>
        </div>
        <div className={s.descriptionBlock}>
            Ava + description
            </div>
    </div>
}

export default ProfileInfo;