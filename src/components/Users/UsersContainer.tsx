import React from "react";
import { connect } from "react-redux";
import {  
  follow,
  unFollow,
  requestUsers,
  UsersType,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import { compose } from "redux";
import { getCurrentPage, getFollowRequest, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from "../../redux/users-selectors";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
  isFetching: boolean
  currentPage: number
  pageSize: number
  totalUsersCount: number
  users: Array<UsersType>
  followRequest: Array<number>
}
type MapDispatchPropsType = {
  unFollow: (id: number) => void
  follow: (id: number) => void
  requestUsers: (pageNumber: number, pageSize: number) => void
}
type OwnPropsType = {

}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersAPI extends React.Component<PropsType> {
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize);
  }
  onPageChanged = (pageNumber: number) => {
    this.props.requestUsers(pageNumber, this.props.pageSize);
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
          followRequest={this.props.followRequest}
          follow={this.props.follow}
          unFollow={this.props.unFollow}
        />
      </div>
    );
  }
}

let mapStateToProps = (state: AppStateType
): MapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followRequest: getFollowRequest(state),
  };
};

const UsersContainer = compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    requestUsers,
    follow,
    unFollow,
  })
)(UsersAPI);

export default UsersContainer;
