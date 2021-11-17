import React from "react";
import s from "./Message.module.css";

type Props = {
  message: string
}

const Message: React.FC<Props> = (props) => {
  return <div className={s.message}>{props.message}</div>;
};

export default Message;
