import React, { ChangeEvent, useEffect, useState } from "react";
import s from "./Status.module.css";

type Props = {
  status: string
  authId: number
  currentId: number
  updateStatus: (status: string)=>void
}

const ProfileStatusWithHooks: React.FC<Props> = ({ status, updateStatus, authId, currentId }) => {
  let [editMode, setEditMode] = useState<boolean>(false);
  let [localStatus, setStatus] = useState<string>(status);

  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    if (localStatus !== status) {
      updateStatus(localStatus);
    }
    setEditMode(false);
  };
  const onStatuschange = (e: ChangeEvent<HTMLInputElement>) => {
    let text = e.currentTarget.value;
    setStatus(text);
  };

  useEffect(() => {
    setStatus(status);
  }, [status]);

  return (
    <div className={s.status}>
      {!editMode ? (
        <div
          className={s.status__show}
          onClick={currentId == authId ? activateEditMode : undefined}
        >
          {status || (
            <div className={s.statusPlaseholder}>
              {currentId == authId
                ? "Change your status"
                : "User status"}
            </div>
          )}
        </div>
      ) : (
        <input
          className={s.status__edit}
          autoFocus
          onChange={onStatuschange}
          onBlur={deactivateEditMode}
          value={localStatus}
        />
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
