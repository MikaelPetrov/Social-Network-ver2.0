import { NavLink } from 'react-router-dom';
import * as axios from 'axios';
import s from './Users.module.css';
import userNoImagePhoto from '../../assets/Images/userNoImagePhoto.png';


let Users = (props) => {

    let pagesCount = Math.ceil(props.totalCountUsers / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span
                    className={props.currentPage === p && s.selectedPage}
                    onClick={(e) => { props.onPageChanged(p) }}>{p} </span>
            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
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
                                ? <button disabled={props.isFollowingProgress.some(id => id === u.id)} onClick={() => {
                                    props.toggleIsFollowingProgress(true, u.id);
                                    axios
                                        .delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                            withCredentials: true,
                                            headers: {
                                                "API-KEY": "4f060539-4f34-488d-9829-06d708667488"
                                            }
                                        })
                                        .then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.unfollow(u.id)
                                            }
                                            props.toggleIsFollowingProgress(false, u.id);
                                        });
                                }}>Unfollow</button>
                                : <button disabled={props.isFollowingProgress.some(id => id === u.id)} onClick={() => {
                                    props.toggleIsFollowingProgress(true, u.id);
                                    axios
                                        .post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                            withCredentials: true,
                                            headers: {
                                                "API-KEY": "4f060539-4f34-488d-9829-06d708667488"
                                            }
                                        })
                                        .then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.follow(u.id)
                                            }
                                            props.toggleIsFollowingProgress(false, u.id);
                                        });
                                }}>Follow</button>
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
    </div >
}

export default Users;