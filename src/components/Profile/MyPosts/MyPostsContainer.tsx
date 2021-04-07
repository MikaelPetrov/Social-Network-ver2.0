import { connect } from "react-redux";
import { actions } from "../../../redux/profile-reducer";
import { AppStateType } from "../../../redux/redux-store";
import { PostType } from "../../../types/types";
import MyPostsMemorized from "./MyPosts";

type StatePropsType = {
    posts: Array<PostType>
}
type DispatchPropsType = {
    addPost: (newPostText: string) => void
}
export type MyPostsPropsType = StatePropsType & DispatchPropsType

const mapStateToProps = (state: AppStateType): StatePropsType => {
    return {
        posts: state.profilePage.posts
    }
}
const mapDispatchToProps: DispatchPropsType = {
    addPost: actions.addPostAction
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPostsMemorized)
export default MyPostsContainer
