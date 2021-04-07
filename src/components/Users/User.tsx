import { NavLink } from "react-router-dom";
import s from './Users.module.css';
import userNoImagePhoto from '../../assets/Images/userNoImagePhoto.png';
import { UserType } from "../../types/types";

type PropsType = {
    users: Array<UserType>
    isFollowingProgress: Array<number>
    unfollowThunk: (userId: number) => void
    followThunk: (userId: number) => void
}

const User: React.FC<PropsType> = ({ users, isFollowingProgress, unfollowThunk, followThunk }) => {
    return <div>
        {users.map(u => <div key={u.id}>
            <div className={s.usersBlock}>
                <div>
                    <div className={s.userPhoto}>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userNoImagePhoto} />
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={isFollowingProgress.some(id => id === u.id)} onClick={() => { unfollowThunk(u.id) }}>Unfollow</button>
                            : <button disabled={isFollowingProgress.some(id => id === u.id)} onClick={() => { followThunk(u.id) }}>Follow</button>
                        }
                    </div>
                </div>
                <div>
                    <div>
                        {u.name}
                    </div>
                    <div>
                        {u.status}
                    </div>
                </div>
                <div>
                    <div>
                        {'u.location.country'}
                    </div>
                    <div>
                        {'u.location.city'}
                    </div>
                </div>
            </div>
        </div>)}
    </div>
}

export default User
