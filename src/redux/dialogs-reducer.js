const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

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
    newMessageText: ''
}

const dialogsReducer = (state = initialState, action) => {
    let stateCopy;
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY: {
            stateCopy = {
                ...state,
                newMessageText: action.text
            }
            return stateCopy;
        }
        case SEND_MESSAGE: {
            let text = state.newMessageText;
            let message = {
                id: 4,
                message: text
            }
            stateCopy = {
                ...state,
                newMessageText: '',
                messagesData: [...state.messagesData, message]

            }
            return stateCopy;
        }
        default:
            return state;
    }
}

export const sendMessageCreator = () => ({ type: SEND_MESSAGE })
export const updateMessageBodyCreator = (text) => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        text: text
    }
}

export default dialogsReducer;