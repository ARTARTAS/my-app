import React from "react";
import Preloader from "../../Common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./Status/StatusWithHooks";

const ProfileInfo = (props) => {
  const onMainPhotoSelected = (e) =>{
    console.log(e.target.files.length)
    if(e.target.files.length){
      props.savePhoto(e.target.files[0])
    }
  }

  if (!props.profile) {
    return <Preloader />;
  }
    return (
    <div className={s.infoBlock}>
      <div className={s.avatar__arrea}>
        <img
          className={s.avatar}
          src={
            props.profile.photos.large != null
              ? props.profile.photos.large
              : "https://html5css.ru/howto/img_avatar.png"
          }
          alt="avatar"
        />
        {props.currentId == props.authId ? <input className={s.avatar__loader} type={"file"} onChange={onMainPhotoSelected} /> : ""}
      </div>
      <div className={s.descriptionBlock}>
        <div className={s.pData}>
          <div className={s.fullName}>{props.profile.fullName}</div>
          <ProfileStatusWithHooks
            status={props.status}
            updateStatus={props.updateStatus}
            authId={props.authId}
            currentId={props.currentId}
          />
        </div>

        <div className={s.contacts}>
          <div>
            About me:
            <div className={s.aboutMe}>{props.profile.aboutMe}</div>
          </div>
          Contacts:
          <div className={s.contact}>
            faceboock: {props.profile.contacts.facebook}
          </div>
          <div className={s.contact}>
            website: {props.profile.contacts.website}
          </div>
          <div className={s.contact}>vk: {props.profile.contacts.vk}</div>
          <div className={s.contact}>
            twitter: {props.profile.contacts.twitter}
          </div>
          <div className={s.contact}>
            instagram: {props.profile.contacts.instagram}
          </div>
          <div className={s.contact}>
            youtube: {props.profile.contacts.youtube}
          </div>
          <div className={s.contact}>
            github: {props.profile.contacts.github}
          </div>
          <div className={s.lfj}>
            Looking for job: {props.profile.lookingForAJobDescription}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
