import { NavLink } from 'react-router-dom';
import s from './Users.module.css';
import userNoImagePhoto from '../../assets/Images/userNoImagePhoto.png';

let User = ({ users, isFollowingProgress, unfollowThunkCreator, followThunkCreator }) => {
    return <div>
        {
            users.map(u => <div key={u.id}>
                <div className={s.usersBlock}>
                    <div>
                        <div className={s.userPhoto}>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small
                                    != null
                                    ? u.photos.small
                                    : userNoImagePhoto} />
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={isFollowingProgress.some(id => id === u.id)} onClick={() => { unfollowThunkCreator(u.id); }}>
                                    Unfollow</button>
                                : <button disabled={isFollowingProgress.some(id => id === u.id)} onClick={() => { followThunkCreator(u.id); }}>
                                    Follow</button>
                            }
                        </div>
                    </div>
                    <div>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </div>
                    <div>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </div>
                </div>
            </div>)
        }
    </div>
}

export default User