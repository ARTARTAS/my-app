import React from "react";
import { connect } from "react-redux";
import {
  followUser,
  unfollowUser,
  setFollowRequest,
  getUsers,
  follow,
  unFollow,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class UsersAPI extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }
  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
  };
  render() {
    return (
      <div>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          totalUsersCount={this.props.totalUsersCount}
          unfollowUser={this.props.unfollowUser}
          followUser={this.props.followUser}
          setFollowRequest={this.props.setFollowRequest}
          followRequest={this.props.followRequest}
          follow={this.props.follow}
          unFollow={this.props.unFollow}
        />
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followRequest: state.usersPage.followRequest,
  };
};

const UsersContainer = compose(
  connect(mapStateToProps, {
    followUser,
    unfollowUser,
    setFollowRequest,
    getUsers,
    follow,
    unFollow,
  }),
  withAuthRedirect
)(UsersAPI);

export default UsersContainer;
