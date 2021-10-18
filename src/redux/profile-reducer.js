import { profileAPI } from "../API/API";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_STATUS = 'SET-USER-STATUS';
const DELETE_POST = 'DELETE-POST';

let initialState = {
    PostData: [
        { id: 1, message: "hi", likesCount: 5 },
        { id: 2, message: "Hello", likesCount: 12 },
    ],
    newPostText: "",
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 3,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                newPostText: '',
                PostData: [newPost, ...state.PostData]
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: { ...action.profile }
            }
        case SET_USER_STATUS:
            return {
                ...state,
                status: action.text
            }
        case DELETE_POST:
            return { ...state, PostData: state.PostData.filter(p => p.id !== action.id) }
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = (text) => ({ type: SET_USER_STATUS, text });
export const deletePost = (id) => ({ type: DELETE_POST, id });


export const getProfile = (id) => async (dispatch) => {
    let response = await profileAPI.getProfile(id);
    dispatch(setUserProfile(response));
}

export const getStatus = (id) => async (dispatch) => {
    let response = await profileAPI.getStatus(id)
    dispatch(setUserStatus(response));

}

export const updateStatus = (text) => async (dispatch) => {
    let response = await profileAPI.updateStatus(text);
    if (response.resultCode === 0) { dispatch(setUserStatus(text)) };


}
export default profileReducer;