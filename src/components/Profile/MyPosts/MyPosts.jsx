import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
  let postElements = props.PostData.map((p) => (
    <Post message={p.message} likesCount={p.likesCount} />
  ));

  let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost()
    // props.dispatch(addPostActionCreator());
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text)
    // props.dispatch(updateNewPostTextActionCreator(text));
  };

  return (
    <div className={s.MyPosts}>
      <h3> My posts</h3>
      <div>
        <div className={s.textArea}>
          <textarea className={s.newPost}
            ref={newPostElement}
            placeholder="Enter your message"
            onChange={onPostChange}
            value={props.newPostText}
          />
        </div>
        <div>
          <button className={s.button} onClick={onAddPost}>Add post</button>
        </div>
      </div>
      <div className={s.posts}>{postElements}</div>
    </div>
  );
};
export default MyPosts;
