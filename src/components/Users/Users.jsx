import React from "react";
import { NavLink } from "react-router-dom";
import { usersAPI } from "../../API/API";
import s from "./Users.module.css";

const Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  return (
    <div>
      {props.users.map((u) => (
        <div className={s.userArea} key={u.id}>
          <div>
            <div>
              <NavLink to={"/profile/" + u.id}>
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
                  disabled={props.followRequest.some((id) => id === u.id)}
                  className={s.followButton}
                  onClick={() => {
                    props.unFollow(u.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={props.followRequest.some((id) => id === u.id)}
                  className={s.unfollowButton}
                  onClick={() => {
                    props.follow(u.id);
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
              {u.status ? (
                <div className={s.status}>
                  <div>{u.status}</div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className={s.rightBlock}>
              <div>{""}</div>
              <div>{""}</div>
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
