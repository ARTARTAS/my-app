import React from "react";
import { Redirect } from "react-router";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {  
  return (
    <div className={s.profile}>
      <ProfileInfo profile={props.profile}/>
      <MyPostsContainer />
    </div>
  );
};
export default Profile;
