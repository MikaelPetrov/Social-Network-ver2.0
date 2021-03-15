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
                            <img src={u.photos.small
                                != null
                                ? u.photos.small
                                : userNoImagePhoto}></img>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
                                : <button onClick={() => { props.follow(u.id) }}>Follow</button>
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