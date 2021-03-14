import * as axios from 'axios';
import s from './Users.module.css';
import userNoImagePhoto from '../../assets/Images/userNoImagePhoto.png'
import React from 'react';

class Users extends React.Component {

    constructor(props) {
        super(props);

        axios
            .get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return <div>
            {
                this.props.users.map(u => <div key={u.id}>
                    <div className={s.usersBlock}>
                        <div>
                            <div className={s.userPhoto}>
                                <img src={u.photos.small != null
                                    ? u.photos.small
                                    : userNoImagePhoto}></img>
                            </div>
                            <div>
                                {u.followed
                                    ? <button onClick={() => { this.props.unfollow(u.id) }}>Unfollow</button>
                                    : <button onClick={() => { this.props.follow(u.id) }}>Follow</button>
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
}


export default Users;