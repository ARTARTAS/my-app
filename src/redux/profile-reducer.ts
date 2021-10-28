import { AppStateType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { FormAction, stopSubmit } from "redux-form";
import { profileAPI } from "../API/API";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_USER_STATUS = "SET-USER-STATUS";
const DELETE_POST = "DELETE-POST";
const SAVE_PHOTO = "SAVE-PHOTO";

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
    case ADD_POST:
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
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: { ...action.profile } as ProfileType,
      };
    case SET_USER_STATUS:
      return {
        ...state,
        status: action.text,
      };
    case SAVE_PHOTO:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    case DELETE_POST:
      return {
        ...state,
        PostData: state.PostData.filter((p) => p.id !== action.id),
      };
    default:
      return state;
  }
};

type ActionTypes =
  | AddPostActionCreatorType
  | SetUserProfileActionType
  | SetUserStatusActionType
  | DeletePostActionType
  | SavePhotoSuccesActionType

type AddPostActionCreatorType = {
  type: typeof ADD_POST;
  newPostText: string;
};
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({
  type: ADD_POST,
  newPostText,
});
type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE;
  profile: object | null;
};
export const setUserProfile = (profile: object | null): SetUserProfileActionType => ({
  type: SET_USER_PROFILE,
  profile,
});
type SetUserStatusActionType = {
  type: typeof SET_USER_STATUS;
  text: string | null;
};
export const setUserStatus = (text: string | null): SetUserStatusActionType => ({ type: SET_USER_STATUS, text });
type DeletePostActionType = {
  type: typeof DELETE_POST;
  id: number;
};
export const deletePost = (id: number): DeletePostActionType => ({
  type: DELETE_POST,
  id,
});
type SavePhotoSuccesActionType = {
  type: typeof SAVE_PHOTO;
  photos: object;
};
export const savePhotoSucces = (photos: object): SavePhotoSuccesActionType => ({
  type: SAVE_PHOTO,
  photos,
});

export const getProfile = (id: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch) => {
  let response = await profileAPI.getProfile(id);
  dispatch(setUserProfile(response));
};
export const getStatus = (id: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch) => {
  let response = await profileAPI.getStatus(id);
  dispatch(setUserStatus(response));
};
export const updateStatus = (text: string): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch) => {
  let response: any = await profileAPI.updateStatus(text);
  if (response.resultCode === 0) {
    dispatch(setUserStatus(text));
  }
};
export const savePhoto = (photo: any): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch) => {
  let response: any = await profileAPI.savePhoto(photo);
  if (response.resultCode === 0) {
    dispatch(savePhotoSucces(response.data.photos));
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
