import React from "react";
import s from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={`${s.item}`}>
      <img
        className={s.avatar}
        src="https://html5css.ru/howto/img_avatar.png"
        alt="avatar"
      />
      {props.message}
      <div className={s.LikeStat}>
        <div className={s.likesCount}>{props.likesCount}</div>
        <button className={s.likeBttn}>
          <img
            className={s.like}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Ei-like.svg/768px-Ei-like.svg.png"
            alt="like"
          />
        </button>
      </div>
    </div>
  );
};
export default Post; 
