import React from "react";
import {
  sendMessageCreator,
  updateMessageBodyCreator,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {
  let state = props.store.getState();

  let addMessage = () => {
    props.store.dispatch(sendMessageCreator());
  };

  let onMessageChange = (text) => {
    props.store.dispatch(updateMessageBodyCreator(text));
  };

  return (
    <Dialogs
      updateNewMessage={onMessageChange}
      addMessage={addMessage}
      messagesPage={state.messagesPage}            
    />
  );
};

export default DialogsContainer;
