import React from "react";
import Header from "./Header";
import axios from "axios";
import { connect } from "react-redux";
import { setAuthUserData } from "../../redux/auth-reducer";
import { usersAPI } from "../../API/API";

class HeaderAPI extends React.Component {
  componentDidMount() {
    usersAPI.getAuthMe().then((data) => {
      if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        this.props.setAuthUserData({ id, email, login });
      }
    });
  }
  render() {
    return <Header {...this.props} />;
  }
}

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};

export const HeaderContainer = connect(mapStateToProps, { setAuthUserData })(
  HeaderAPI
);

export default HeaderContainer;
