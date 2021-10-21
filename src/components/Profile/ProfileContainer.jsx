import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import {
  getProfile,
  getStatus,
  savePhoto,
  saveProfile,
  updateStatus,
} from "../../redux/profile-reducer";
import { withRouter } from "react-router";
import { compose } from "redux";

class ProfileAPI extends React.Component {
  refreshProfile() {
    let id = this.props.match.params.userId;
    if (!id) {
      id = this.props.authId;
      if (!id) {
        this.props.history.push("/login");
      }
    }
    this.props.getProfile(id);
    this.props.getStatus(id);
  }

  componentDidMount() {
    this.refreshProfile();
  }
  componentDidUpdate(prevprops, prevstate, snapshot) {
    if (this.props.match.params.userId !== prevprops.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        profile={this.props.profile}
        isAuth={this.props.isAuth}
        status={this.props.status}
        authId={this.props.authId}
        currentId={this.props.match.params.userId}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}
      />
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authId: state.auth.id,
  isAuth: state.auth.isAuth,
});

const ProfileContainer = compose(
  connect(mapStateToProps, {
    getProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile
  }),
  withRouter
)(ProfileAPI);
export default ProfileContainer;
