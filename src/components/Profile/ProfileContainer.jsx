import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { getProfile } from "../../redux/profile-reducer";
import { withRouter } from "react-router";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

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

let WithUrlDataContainerComponent = withRouter(ProfileAPI);

let AuthRedirectComponent = withAuthRedirect(WithUrlDataContainerComponent);

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
});

const ProfileContainer = connect(mapStateToProps, {
  getProfile,
})(AuthRedirectComponent);

export default ProfileContainer;
