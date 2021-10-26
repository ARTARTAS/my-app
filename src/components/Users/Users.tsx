import React from "react";
import { NavLink } from "react-router-dom";
import { UsersType } from "../../redux/users-reducer";
import Paginator from "../Common/Paginator/Paginator";
import s from "./Users.module.css";

type Props = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  portionSize?: number
  users: Array<UsersType>
  followRequest: Array<number>
  unFollow: (id: number) => void
  follow: (id: number) => void
}

const Users: React.FC<Props> = ({ totalUsersCount, pageSize, currentPage, onPageChanged, portionSize, users, followRequest, unFollow, follow }) => {
  return (
    <div>
      <Paginator
        pageSize={pageSize}
        totalItemCount={totalUsersCount}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        portionSize={portionSize}
      />
      <div>
        {users.map((u) => (
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
                    disabled={followRequest.some((id) => id === u.id)}
                    className={s.followButton}
                    onClick={() => {
                      unFollow(u.id);
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    disabled={followRequest.some((id) => id === u.id)}
                    className={s.unfollowButton}
                    onClick={() => {
                      follow(u.id);
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
    </div>
  );
};

export default Users;
