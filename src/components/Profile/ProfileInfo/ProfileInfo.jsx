import React, { useState } from "react";
import Preloader from "../../Common/Preloader/Preloader";
import ProfileDataReduxForm from "./ProfileDataForm/ProfileDataForm";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./Status/StatusWithHooks";

const ProfileInfo = (props) => {
  let isOwner = props.currentId == props.authId;
  const [editMode, setEditMode] = useState(false);
  const [photoEditMode, setphotoEditMode] = useState(false);

  const onMainPhotoSelected = (e) => {
    console.log(e.target.files.length);
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };
  let onSubmit = (formData) => {
    props.saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };
  
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div className={s.infoBlock}>
      <div
        className={s.avatar__arrea}
        onMouseEnter ={
          isOwner &&
          (() => {
            setphotoEditMode(true);
          })
        }
        onMouseLeave ={
          isOwner &&
          (() => {
            setphotoEditMode(false);
          })
        }
      >
        <img
          className={s.avatar}
          src={
            props.profile.photos.large != null
              ? props.profile.photos.large
              : "https://html5css.ru/howto/img_avatar.png"
          }
          alt="avatar"
        />
        {photoEditMode ? (
          <input
            className={s.avatar__loader}
            type={"file"}
            onChange={onMainPhotoSelected}
          />
        ) : (
          ""
        )}
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
        {editMode ? (
          <ProfileDataReduxForm
            profile={props.profile}
            initialValues={props.profile}
            onSubmit={onSubmit}
            setEditMode={setEditMode}
          />
        ) : (
          <ProfileData
            profile={props.profile}
            isOwner={isOwner}
            setEditMode={setEditMode}
          />
        )}
      </div>
    </div>
  );
};

const ProfileData = ({ profile, isOwner, setEditMode }) => {
  return (
    <div className={s.contacts}>
      <div>
        <div className={s.aboutMe}>
          <b>About me:</b>
          <div>{profile.aboutMe}</div>
        </div>
        <b>Contacts:</b>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key]}
            />
          );
        })}
        <div className={s.lfj}>
          <b>Looking for job</b>: {profile.lookingForAJob ? "Yes" : "No"}
        </div>
        <div className={s.lfjdescr}>
          <b>My skills</b>:
          {profile.lookingForAJob ? profile.lookingForAJobDescription : ""}
        </div>
      </div>
      <div>
        {isOwner && (
          <button className={s.editButtn} onClick={() => setEditMode(true)}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export const Contact = ({ key, contactTitle, contactValue }) => {
  return (
    <div>
      <div className={s.contact} key={key}>
        <b>{contactTitle}</b>: {contactValue}
      </div>
    </div>
  );
};

export default ProfileInfo;
