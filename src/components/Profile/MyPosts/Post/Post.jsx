import s from './Post.module.css';


const Post = (props) => {
    return <div className={s.item}>
        <img src='https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/03fa610457d8f42009716365516cc142-1612444766/Dr_Noir_1-01/create-minimalist-avatar-social-media-profile-picture.png'></img>
        {props.message}
        <div>
            <span>like </span>{props.likesCount}
        </div>
    </div>
}

export default Post;