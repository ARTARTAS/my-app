import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { setUserProfile } from "../../redux/profile-reducer";
import { withRouter } from "react-router";

class ProfileAPI extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if(!userId) {
      userId = 2;
    }
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
      .then((response) => {
        this.props.setUserProfile(response.data);
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
