import React from "react";
import Preloader from "../../Common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatus from "./Status/Status";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div className={s.infoBlock}>
      <img
        className={s.avatar}
        src={
          props.profile.photos.large != null
            ? props.profile.photos.large
            : "https://html5css.ru/howto/img_avatar.png"
        }
        alt="avatar"
      />
      <div className={s.descriptionBlock}>
        <div className={s.pData}>
          <div className={s.fullName}>{props.profile.fullName}</div>
          <ProfileStatus
            status={props.status}
            updateStatus={props.updateStatus}
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
