import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Users.module.css";

const Users = (props) => {
  let pagesCount = Math.ceil(
    props.totalUsersCount / props.pageSize
  );
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  return (
    <div>
      {props.users.map((u) => (
        <div key={u.id} className={s.userArea}>
          <div>
            <div>
              <NavLink to={'/profile/' + u.id}>
              <img
                className={s.avatar}
                src={
                  u.photos.large != null
                    ? u.photos.large
                    : "https://html5css.ru/howto/img_avatar.png"
                }
              />
              </NavLink>
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
              <div className={s.fullName}>{u.name}</div>
              <div className={s.status}>
                <div>{u.status}</div>
              </div>
            </div>
            <div className={s.rightBlock}>
              <div>{"u.location.city"}</div>
              <div>{"u.location.country"}</div>
            </div>
          </div>
        </div>
      ))}
      <div>
        {pages.map((p) => {
          return (
            <button
              onClick={() => {
                props.onPageChanged(p);
              }}
              className={
                props.currentPage === p ? s.selectedPage : s.pageNumber
              }
            >
              {p}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
