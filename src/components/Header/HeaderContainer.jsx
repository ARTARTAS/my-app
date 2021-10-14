import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import {logout } from "../../redux/auth-reducer";

class HeaderAPI extends React.Component {
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

export const HeaderContainer = connect(mapStateToProps, {logout })(
  HeaderAPI
);
export default HeaderContainer;
