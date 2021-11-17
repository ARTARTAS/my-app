import React from "react";
import { NavLink } from "react-router-dom";
import s from "./DialogItem.module.css";

type Props = {
  id: number
  name: string
}

const DialogItem: React.FC<Props> = (props) => {
  let path = "/dialogs/" + props.id;
  return (
    <div className={s.dialog + " " + s.active}>
      <img
        className={s.avatar}
        src="https://html5css.ru/howto/img_avatar.png"
        alt="avatar"
      />
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};

export default DialogItem;
