import s from './MyPosts.module.css';
import Post from './Post/Post';
import AddNewPostReduxForm, { NewPostFormValuesType } from './AddPostForm/AddPostForm';
import React from 'react';
import { MyPostsPropsType } from './MyPostsContainer';

const MyPosts: React.FC<MyPostsPropsType> = ({ posts, addPost }) => {

    // shouldComponentUpdate(nextProps, nextState, nextContext){    /* for Class component - optimization count renders */
    //     return nextProps != this.props || nextState != this.state
    // }

    // class MyPosts extends PureComponent {}   /* short version for Class component */

    let postsElements = [...posts].reverse().map(p => <Post
        key={p.id}
        message={p.message}
        likesCount={p.likesCount} />)

    let onAddPost = (values: NewPostFormValuesType) => {
        addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostReduxForm onSubmit={onAddPost} />
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

const MyPostsMemorized = React.memo(MyPosts)
export default MyPostsMemorized
