import { NavLink } from 'react-router-dom';
import s from './Header.module.css';


const Header = (props) => {
    return <header className={s.header}>
        <img src='https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg' />
        <div className={s.loginBlock}>
            {props.isAuth
                ? <div>{props.login} - <button onClick={props.logoutThunkCreator}>Log Out</button></div>
                : <NavLink to={'/login'}>Log In</NavLink>}
        </div>
    </header>
}

export default Header;