import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import {logout } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";

type PropsType ={
  isAuth: boolean,
  login: string | null
  logout: ()=>void
}

class HeaderAPI extends React.Component<PropsType> {
  render() {
    return <Header {...this.props} />;
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};

export const HeaderContainer = connect(mapStateToProps, {logout })(
  HeaderAPI
);
export default HeaderContainer;
