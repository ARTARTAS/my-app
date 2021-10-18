import React from "react";
import { NavLink } from "react-router-dom";
import Paginator from "./Paginator/Paginator";
import s from "./Users.module.css";

const Users = (props) => {
  return (
    <div>      
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
                    alt="avatar"
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
      </div>
      <Paginator
        pageSize={props.pageSize}
        totalUsersCount={props.totalUsersCount}
        currentPage={props.currentPage}
        onPageChanged={props.onPageChanged}
      />
    </div>
  );
};

export default Users;
