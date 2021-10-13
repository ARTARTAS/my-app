import React from "react";
import { Field, reduxForm } from "redux-form";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";

const Dialogs = (props) => {
  let dialogsElement = props.messagesPage.dialogData.map((d) => (
    <DialogItem name={d.name} key={d.id} id={d.id} />
  ));

  let messagesElement = props.messagesPage.messagesData.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

  return (
    <div className={s.dialogs}>
      <div className={s.dialogs__Items}>{dialogsElement}</div>
      <div className={s.messages}>
        <div className={s.Message_Area}>{messagesElement}</div>
        <div className={s.New_Message_Area}>
          <AddMessageReduxForm onSubmit={props.addMessage}/>
        </div>
      </div>
    </div>
  );
};

export const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        className={s.textarea}
        name="newMessageText"
        component="textarea"
        placeholder="Enter your message"       
      ></Field>
      <div>
        <button className={s.send_button}>
          Send Message
        </button>
      </div>
    </form>
  );
};

const AddMessageReduxForm = reduxForm({
  form: "dialogAddMessageForm",
})(AddMessageForm);

export default Dialogs;
