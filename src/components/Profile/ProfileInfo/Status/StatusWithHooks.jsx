import React, { useEffect, useState } from "react";
import s from "./Status.module.css";

const ProfileStatusWithHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    props.updateStatus(status);
    setEditMode(false);
  };
  const onStatuschange = (e) => {
    let text = e.currentTarget.value;
    setStatus(text);
  };

  useEffect(() => {
    setStatus(props.status);
  },[props.status]);

  console.log(status);
  return (
    <div className={s.status}>
      {!editMode ? (
        <div className={s.status__show} onClick={activateEditMode}>
          {props.status || (
            <div className={s.statusPlaseholder}>Change your status</div>
          )}
        </div>
      ) : (
        <input
          className={s.status__edit}
          autoFocus
          onChange={onStatuschange}
          onBlur={deactivateEditMode}
          value={status}
        />
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
