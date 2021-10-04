import React from "react";
import s from "./Users.module.css";

const Users = (props) => {
  return (
    <div>
      {props.users.map((u) => (
        <div key={u.id} className={s.userArea}>
          <div>
            <div>
              <img className={s.avatar} src={u.photoURL} alt="avatar" />
            </div>
            <div>
              {u.followed ? (
                <button
                  className={s.followButton}
                  onClick={() => {
                    props.unfollowUser(u.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className={s.unfollowButton}
                  onClick={() => {
                    props.followUser(u.id);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
          <div className={s.description}>
            <div className={s.leftBlock}>
              <div className={s.fullName}>{u.fullName}</div>
              <div className={s.status}>
                <div>{u.status}</div>
              </div>
            </div>
            <div className={s.rightBlock}>
              <div>{u.location.city}</div>
              <div>{u.location.country}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Users;
