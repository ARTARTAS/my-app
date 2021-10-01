import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";

const Dialogs = (props) => {
  let dialogsElement = props.messagesPage.dialogData.map((d) => (
    <DialogItem name={d.name} id={d.id} />
  ));

  let messagesElement = props.messagesPage.messagesData.map((m) => (
    <Message message={m.message} />
  ));

  let newMessageElement = React.createRef();

  let addMessage = () => {
    props.addMessage()
  };

  let onMessageChange = () => {
    let text = newMessageElement.current.value;
    props.updateNewMessage(text);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogs__Items}>{dialogsElement}</div>
      <div className={s.messages}>
        <div className={s.Message_Area}>{messagesElement}</div>
        <div className={s.New_Message_Area}>
          <div>
            <textarea className={s.textarea}
              ref={newMessageElement}
              placeholder="Enter your message"
              onChange={onMessageChange}
              value={props.messagesPage.newMessageText}
            ></textarea>
          </div>
          <div>
            <button className={s.send_button} onClick={addMessage}>Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
