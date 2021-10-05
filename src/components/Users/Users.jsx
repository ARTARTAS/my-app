import * as axios from "axios";
import React from "react";
import s from "./Users.module.css";

class Users extends React.Component {
  componentDidMount() {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
      });
  }
  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
      });
  };
  render() {
    let pagesCount = Math.ceil(
      this.props.totalUsersCount / this.props.pageSize
    );
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    return (
      <div>
        <div>
          {pages.map((p) => {
            return (
              <button
                onClick={() => {
                  this.onPageChanged(p);
                }}
                className={
                  this.props.currentPage === p ? s.selectedPage : s.pageNumber
                }
              >
                {p}
              </button>
            );
          })}
        </div>
        {this.props.users.map((u) => (
          <div key={u.id} className={s.userArea}>
            <div>
              <div>
                <img
                  className={s.avatar}
                  src={
                    u.photos.large != null
                      ? u.photos.large
                      : "https://html5css.ru/howto/img_avatar.png"
                  }
                />
              </div>
              <div>
                {u.followed ? (
                  <button
                    className={s.followButton}
                    onClick={() => {
                      this.props.unfollowUser(u.id);
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className={s.unfollowButton}
                    onClick={() => {
                      this.props.followUser(u.id);
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
      </div>
    );
  }
}

export default Users;
