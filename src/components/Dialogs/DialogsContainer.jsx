import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import {
  sendMessageCreator,
  updateMessageBodyCreator,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

let WithRedirect = withAuthRedirect(Dialogs);

let mapStateToProps = (state) => {
  return {
    messagesPage: state.messagesPage,
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

const DialogsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithRedirect);

export default DialogsContainer;
