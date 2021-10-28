import { AppStateType, InferActionsTypes } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { FormAction, stopSubmit } from "redux-form";
import { profileAPI } from "../API/API";

type PostDataType = {
  id: number;
  message: string;
  likesCount: number;
};
export type ProfileType = {
  aboutMe: string;
  contacts: ContactsType;
  fullName: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  photos: PhotosType;
  userId: number;
};
type ContactsType = {
  facebook: string;
  github: string;
  instagram: string;
  mainLink: string;
  twitter: string;
  vk: string;
  website: string;
  youtube: string;
};
export type PhotosType = {
  large: string;
  small: string;
};
export type InitialStateType = {
  PostData: Array<PostDataType>;
  newPostText: string;
  profile: ProfileType | null;
  status: string | null;
};

let initialState: InitialStateType = {
  PostData: [
    { id: 1, message: "hi", likesCount: 5 },
    { id: 2, message: "Hello", likesCount: 12 },
  ],
  newPostText: "",
  profile: null,
  status: "",
};

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case 'ADD_POST':
      let newPost = {
        id: 3,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        newPostText: "",
        PostData: [newPost, ...state.PostData],
      };
    case 'SET_USER_PROFILE':
      return {
        ...state,
        profile: { ...action.profile } as ProfileType,
      };
    case 'SET_USER_STATUS':
      return {
        ...state,
        status: action.text,
      };
    case 'SAVE_PHOTO':
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    case 'DELETE_POST':
      return {
        ...state,
        PostData: state.PostData.filter((p) => p.id !== action.id),
      };
    default:
      return state;
  }
};

type ActionTypes = InferActionsTypes<typeof actions>

export const actions = {
  addPostActionCreator: (newPostText: string) => ({ type: 'ADD_POST', newPostText } as const),
  setUserProfile: (profile: object | null) => ({ type: 'SET_USER_PROFILE', profile } as const),
  setUserStatus: (text: string | null) => ({ type: 'SET_USER_STATUS', text } as const),
  deletePost: (id: number) => ({ type: 'DELETE_POST', id } as const),
  savePhotoSucces: (photos: object) => ({ type: 'SAVE_PHOTO', photos } as const)
}

export const getProfile = (id: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch) => {
  let response = await profileAPI.getProfile(id);
  dispatch(actions.setUserProfile(response));
};
export const getStatus = (id: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch) => {
  let response = await profileAPI.getStatus(id);
  dispatch(actions.setUserStatus(response));
};
export const updateStatus = (text: string): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch) => {
  let response: any = await profileAPI.updateStatus(text);
  if (response.resultCode === 0) {
    dispatch(actions.setUserStatus(text));
  }
};
export const savePhoto = (photo: any): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch) => {
  let response: any = await profileAPI.savePhoto(photo);
  if (response.resultCode === 0) {
    dispatch(actions.savePhotoSucces(response.data.photos));
  }
};
export const saveProfile = (formData: ProfileType): ThunkAction<Promise<void>, AppStateType, unknown, FormAction> => async (dispatch, getState: any) => {
  const id = getState().auth.id;
  let response: any = await profileAPI.saveProfile(formData);
  if (response.resultCode === 0) {
    dispatch(getProfile(id));
  } else {
    console.log(response.messages[0]);
    let message =
      response.messages.length > 0 ? response.messages[0] : "Some error";
    let action = stopSubmit("ProfileData", { _error: message });
    dispatch(action);
    return Promise.reject(response.messages[0]);
  }
};

export default profileReducer;
