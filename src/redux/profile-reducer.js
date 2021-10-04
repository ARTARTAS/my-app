const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

let initialState = {
    PostData: [
        { id: 1, message: "hi", likesCount: 5 },
        { id: 2, message: "Hello", likesCount: 12 },
    ],
    newPostText: ''
};

const profileReducer = (state = initialState, action) => {
    let stateCopy;
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 3,
                message: state.newPostText,
                likesCount: 0
            }
            stateCopy = {
                ...state,
                newPostText: '',
                PostData: [newPost, ...state.PostData]
            };
            return stateCopy;
        case UPDATE_NEW_POST_TEXT:
            stateCopy = {
                ...state,
                newPostText: action.text
            };
            return stateCopy;

        default:
            return state;
    }
}

export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        text: text
    }
}

export default profileReducer;