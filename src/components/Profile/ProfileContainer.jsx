import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { getProfile } from "../../redux/profile-reducer";
import { withRouter } from "react-router";

class ProfileAPI extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.userId;
    if (!id) {
      id = 2;
    }
    this.props.getProfile(id);
  }
  render() {
    return <Profile profile={this.props.profile} isAuth={this.props.isAuth} />;
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth,
});

let WithUrlDataContainerComponent = withRouter(ProfileAPI);

const ProfileContainer = connect(mapStateToProps, {
  getProfile,
})(WithUrlDataContainerComponent);

export default ProfileContainer;
