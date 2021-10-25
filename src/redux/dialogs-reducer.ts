const SEND_MESSAGE = "SEND-MESSAGE";

type InitialStateDialogDataType = {
  id: number;
  name: string;
};
type InitialStateMessagesDataType = {
  id: number;
  message: string;
};
export type InitialStateType = {
  dialogData: Array<InitialStateDialogDataType>;
  messagesData: Array<InitialStateMessagesDataType>;
};

let initialState: InitialStateType = {
  dialogData: [
    { id: 1, name: "Vasya" },
    { id: 2, name: "Petya" },
    { id: 3, name: "Seriy" },
    { id: 4, name: "Dima" },
    { id: 5, name: "Yura" },
  ],
  messagesData: [
    { id: 1, message: "hi" },
    { id: 2, message: "yo" },
    { id: 3, message: "are u here?" },
  ],
};

const dialogsReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE: {
      let text = action.newMessageText;
      let message = {
        id: 4,
        message: text,
      };
      return {
        ...state,
        messagesData: [...state.messagesData, message],
      };
    }
    default:
      return state;
  }
};

type SendMessageCreatorActionType = {
  type: typeof SEND_MESSAGE;
  newMessageText: string;
};

export const sendMessageCreator = (
  newMessageText: string
): SendMessageCreatorActionType => ({
  type: SEND_MESSAGE,
  newMessageText,
});

export default dialogsReducer;
