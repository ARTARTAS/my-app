import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { setUserProfile } from "../../redux/profile-reducer";
import { withRouter } from "react-router";
import { usersAPI } from "../../API/API";

class ProfileAPI extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.userId;
    if (!id) {
      id = 2;
    }
    usersAPI.getProfile(id).then((data) => {
      this.props.setUserProfile(data);
    });
  }
  render() {
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
});

let WithUrlDataContainerComponent = withRouter(ProfileAPI);

const ProfileContainer = connect(mapStateToProps, { setUserProfile })(
  WithUrlDataContainerComponent
);

export default ProfileContainer;
