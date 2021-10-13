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
    ]    
}

const dialogsReducer = (state = initialState, action) => {
        switch (action.type) {       
        case SEND_MESSAGE: {
            let text = action.newMessageText;
            let message = {
                id: 4,
                message: text
            }
            return {
                ...state,                
                messagesData: [...state.messagesData, message]

            }            
        }
        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageText) => ({ type: SEND_MESSAGE, newMessageText })

export default dialogsReducer;