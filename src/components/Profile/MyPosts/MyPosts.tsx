import React from "react";
import { PostDataType } from "../../../redux/profile-reducer";
import s from "./MyPosts.module.css";
import NewPostForm, { NewPostFormValuesType } from "./NewPost/NewPostForm";
import Post from "./Post/Post";

type MapStateProps = {
  PostData: Array<PostDataType>
}
type MapdispatchProps = {
  addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapStateProps & MapdispatchProps> = React.memo((props) => {
  const onSubmit = (formData: NewPostFormValuesType) => {
    props.addPost(formData.newPostText);
  };
  let postElements = props.PostData.map((p) => (
    <Post message={p.message} key={p.id} likesCount={p.likesCount} />
  ));

  return (
    <div className={s.MyPosts}>
      <h3 className={s.myPosts__title}> My posts</h3>
      <NewPostForm onSubmit={onSubmit} />
      <div className={s.posts}>{postElements}</div>
    </div>
  );
})
export default MyPosts;
