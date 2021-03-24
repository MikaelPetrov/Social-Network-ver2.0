import { NavLink } from 'react-router-dom';
import s from './Users.module.css';
import userNoImagePhoto from '../../assets/Images/userNoImagePhoto.png';
import React from 'react';


let Users = React.memo((props) => {

    let pagesCount = Math.ceil(props.totalCountUsers / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) { pages.push(i) };

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
                                    props.unfollowThunkCreator(u.id);
                                }}>
                                    Unfollow</button>
                                : <button disabled={props.isFollowingProgress.some(id => id === u.id)} onClick={() => {
                                    props.followThunkCreator(u.id);
                                }}>
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
    </div >
})

export default Users;