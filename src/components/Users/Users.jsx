import * as axios from "axios";
import React from "react";
import s from "./Users.module.css";

class Users extends React.Component {
  constructor(props) {
    super(props);
    axios
      .get("https://social-network.samuraijs.com/api/1.0/users")
      .then((response) => {
        this.props.setUsers(response.data.items);
      });
  }
  render() {
    return (
      <div>
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
