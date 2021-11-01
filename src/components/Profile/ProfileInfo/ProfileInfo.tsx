import React, { useState } from "react";
import { ContactsType, ProfileType } from "../../../redux/profile-reducer";
import Preloader from "../../Common/Preloader/Preloader";
import ProfileDataReduxForm from "./ProfileDataForm/ProfileDataForm";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./Status/StatusWithHooks";

type MapStateType = {
  authId: number
  currentId: number
  profile: ProfileType
  status: string
}
type MapDispatchType = {
  savePhoto: (photo: File) => void
  saveProfile: (formData: ProfileType) => Promise<any>
  updateStatus: (text: string) => void
}


const ProfileInfo: React.FC<MapStateType & MapDispatchType> = (props) => {
  let isOwner = props.currentId == props.authId;
  const [editMode, setEditMode] = useState<boolean>(false);
  const [photoEditMode, setphotoEditMode] = useState<boolean>(false);

  const onMainPhotoSelected = (e: any) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };
  let onSubmit = (formData: ProfileType) => {
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
        onMouseEnter={
          isOwner
            ? () => {
              setphotoEditMode(true);
            }
            : undefined
        }
        onMouseLeave={
          isOwner
            ? () => {
              setphotoEditMode(false);
            }
            : undefined
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
            onSubmit={onSubmit as any}
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

type ProfileDataPropstype = {
  profile: ProfileType
  isOwner: boolean
  setEditMode: (editMode:boolean) => void
}

const ProfileData: React.FC<ProfileDataPropstype> = ({ profile, isOwner, setEditMode }) => {
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
              contactValue={profile.contacts[key as keyof ContactsType] ? profile.contacts[key as keyof ContactsType] : ""}
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

type ContactPropsType = {
  key: string
  contactTitle: string
  contactValue: string
}

export const Contact: React.FC<ContactPropsType> = ({ key, contactTitle, contactValue }) => {
  return (
    <div>
      <div className={s.contact} key={key}>
        <b>{contactTitle}</b>: {contactValue}
      </div>
    </div>
  );
};

export default ProfileInfo;
