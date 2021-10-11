import React from "react";
import { connect } from "react-redux";
import {
  sendMessageCreator,
  updateMessageBodyCreator,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

let mapStateToProps = (state) => {
  return {
    messagesPage: state.messagesPage,
    isAuth: state.auth.isAuth
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    updateNewMessage: (text) => {
      dispatch(updateMessageBodyCreator(text));
    },
    addMessage: () => {
      dispatch(sendMessageCreator());
    },
  };
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
