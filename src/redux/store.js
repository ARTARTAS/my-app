import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";

let store = {
    _state: {
        profilePage: {
            PostData: [
                { id: 1, message: "hi", likesCount: 5 },
                { id: 2, message: "Hello", likesCount: 12 },
            ],
            newPostText: ''
        },
        messagesPage: {
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

    },
    _callSubscriber() {
        console.log('State changed');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);
        this._callSubscriber(this._state);
    }
}

export default store;
window.store = store;