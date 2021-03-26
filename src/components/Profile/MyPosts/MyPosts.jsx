import s from './MyPosts.module.css';
import Post from './Post/Post';
import { AddNewPostReduxForm } from './AddPostForm/AddPostForm';

const MyPosts = ({ posts, addPost }) => {

    // shouldComponentUpdate(nextProps, nextState, nextContext){            /* for Class component - optimization count renders */
    //     return nextProps != this.props || nextState != this.state
    // }

    // class MyPosts extends PureComponent {}                               /* short version for Class component */

    let postsElements = [...posts].reverse().map(p => <Post message={p.message} likesCount={p.likesCount} />);
    let addNewPost = (values) => { addPost(values.newPostText) }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostReduxForm onSubmit={addNewPost} />
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts