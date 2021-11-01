import React from "react";
import { ProfileType } from "../../redux/profile-reducer";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type MapPropsType = {
  profile: ProfileType
  status: string
  authId: number
  currentId: number
}
type MapDispatchType = {
  updateStatus: (text: string) => void
  savePhoto: (photo: File) => void
  saveProfile: (formData: ProfileType) => Promise<any>
}


const Profile: React.FC<MapPropsType & MapDispatchType> = (props) => {
  return (
    <div className={s.profile}>
      <ProfileInfo
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        authId={props.authId}
        currentId={props.currentId}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}
      />
      <MyPostsContainer />
    </div>
  );
};
export default Profile;
