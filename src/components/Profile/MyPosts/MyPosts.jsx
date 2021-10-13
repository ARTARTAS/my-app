import React from "react";
import s from "./MyPosts.module.css";
import NewPostForm from "./NewPost/NewPostForm";
import Post from "./Post/Post";

const MyPosts = (props) => {
  let postElements = props.PostData.map((p) => (
    <Post message={p.message} key={p.id} likesCount={p.likesCount} />
  )); 
  
  return (
    <div className={s.MyPosts}>
      <h3 className={s.myPosts__title}> My posts</h3>
      <NewPostForm onSubmit={props.addPost} />
      <div className={s.posts}>{postElements}</div>
    </div>
  );
};
export default MyPosts;
