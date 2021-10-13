import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { getAuth, logout } from "../../redux/auth-reducer";


class HeaderAPI extends React.Component {
  componentDidMount() {
    this.props.getAuth()
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

export const HeaderContainer = connect(mapStateToProps, {getAuth , logout})(
  HeaderAPI
);
export default HeaderContainer;
