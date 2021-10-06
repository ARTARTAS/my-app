import React from "react";
import * as axios from "axios";
import { connect } from "react-redux";
import { followActionCreator, setCurrentPageActionCreator, setTotalUsersCountActionCreator, setUsersActionCreator, unfollowActionCreator } from "../../redux/users-reducer";
import Users from "./Users";

class UsersAPI extends React.Component {
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
    return (
      <Users
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        totalUsersCount={this.props.totalUsersCount}
        unfollowUser={this.props.unfollowUser}
        followUser={this.props.followUser}        
      />
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    followUser: (userId) => {
      dispatch(followActionCreator(userId));
    },
    unfollowUser: (userId) => {
      dispatch(unfollowActionCreator(userId));
    },
    setUsers: (users) => {
      dispatch(setUsersActionCreator(users));
    },
    setCurrentPage: (currentPage) =>{
      dispatch(setCurrentPageActionCreator(currentPage))
    },
    setTotalUsersCount: (totalCount) =>{
      dispatch(setTotalUsersCountActionCreator(totalCount))
    }
  };
};
const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPI);

export default UsersContainer;
