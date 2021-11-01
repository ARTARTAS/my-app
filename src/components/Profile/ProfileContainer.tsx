import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import {
  getProfile,
  getStatus,
  ProfileType,
  savePhoto,
  saveProfile,
  updateStatus,
} from "../../redux/profile-reducer";
import { RouteComponentProps, withRouter } from "react-router";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
  getProfile: (id: number) => void
  getStatus: (id: number) => void
  updateStatus: (text: string) => void
  savePhoto: (photo: File) => void
  saveProfile: (formData: ProfileType) => Promise<any>
}
type PathParamsType = {
  userId: string
}
type PropsType = MapPropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileAPI extends React.Component<PropsType> {
  refreshProfile() {
    let id: number | null = +this.props.match.params.userId;
    if (!id) {
      id = this.props.authId;
      if (!id) {
        this.props.history.push("/login");
      }
    }
    if (!id) { throw new Error("ID should exist in URI params or in state") }
    else {
      this.props.getProfile(id);
      this.props.getStatus(id);
    }

  }
  componentDidMount() {
    this.refreshProfile();
  }
  componentDidUpdate(prevprops: PropsType) {
    if (this.props.match.params.userId !== prevprops.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        profile={this.props.profile as ProfileType}
        status={this.props.status}
        authId={this.props.authId as number}
        currentId={+this.props.match.params.userId}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}
      />
    );
  }
}

let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authId: state.auth.id,
  isAuth: state.auth.isAuth,
});

const ProfileContainer = compose<React.ComponentType>(
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
