import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={s.header}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/1/16/Facebook-icon-1.png"
        alt="logo"
      ></img>
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div className={s.userName}>
            {props.login}

            <button className={s.logout} onClick={props.logout}>
              Logout
            </button>
          </div>
        ) : (
          <NavLink className={s.loginLink} to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
