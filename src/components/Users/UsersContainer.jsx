import React from "react";
import { connect } from "react-redux";
import {
  followUser,
  unfollowUser,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  setFetching,
  setFollowRequest,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import { usersAPI } from "../../API/API";

class UsersAPI extends React.Component {
  componentDidMount() {
    this.props.setFetching(true);
    usersAPI
      .getUsers(this.props.currentPage, this.props.pageSize)
      .then((data) => {
        this.props.setFetching(false);
        this.props.setUsers(data.items);
        this.props.setTotalUsersCount(data.totalCount);
      });
  }
  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.setFetching(true);
    usersAPI.getUsers(pageNumber, this.props.pageSize).then((data) => {
      this.props.setFetching(false);
      this.props.setUsers(data.items);
    });
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

const UsersContainer = connect(mapStateToProps, {
  followUser,
  unfollowUser,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  setFetching,
  setFollowRequest,
})(UsersAPI);

export default UsersContainer;
