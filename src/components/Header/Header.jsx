import React from "react";
import s from "./Header.module.css";

const Header = () => {
  return (
    <header className={s.header}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/1/16/Facebook-icon-1.png"
        alt="logo"
      ></img>      
    </header>
  );
};

export default Header;
