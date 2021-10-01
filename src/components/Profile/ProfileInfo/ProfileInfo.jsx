import React from "react";
import s from "./ProfileInfo.module.css";

const ProfileInfo = (props) => {
  return (
         
      <div className={s.descriptionBlock} >
        <img
          className={s.avatar}
          src="https://html5css.ru/howto/img_avatar.png"
          alt="avatar"
        />
        <div>description</div>
      </div>
    
  );
};

export default ProfileInfo;
