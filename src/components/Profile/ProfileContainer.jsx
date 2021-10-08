import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { getProfile, setUserProfile } from "../../redux/profile-reducer";
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
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
});

let WithUrlDataContainerComponent = withRouter(ProfileAPI);

const ProfileContainer = connect(mapStateToProps, {
  setUserProfile,
  getProfile,
})(WithUrlDataContainerComponent);

export default ProfileContainer;
