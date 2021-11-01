import { InferActionsTypes } from "./redux-store";

let initialState = {
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

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case "SEND_MESSAGE": {
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

type ActionTypes = InferActionsTypes<typeof actions>

export const actions = {
  sendMessage: (newMessageText: string) => ({ type: 'SEND_MESSAGE', newMessageText, } as const)
}

export default dialogsReducer;
