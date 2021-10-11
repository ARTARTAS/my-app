import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { getProfile } from "../../redux/profile-reducer";
import { withRouter } from "react-router";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

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
});

const ProfileContainer =compose(
  connect(mapStateToProps, {
    getProfile,
  }),
  withAuthRedirect,
  withRouter
)(ProfileAPI)

export default ProfileContainer;
