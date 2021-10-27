import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux-store';
import { actionTypes, FormAction, stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../API/API";

const SET_USER_DATA = "SET-USER-DATA";
const GET_CAPTCHA_URL_SUCCESS = "GET-CAPTCHA-URL-SUCCESS";

export type InitialStateType = {
  id: number | null;
  email: null | string;
  login: null | string;
  isAuth: boolean;
  captchaUrl: null | string;
};
let initialState: InitialStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_CAPTCHA_URL_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
type ActionTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType | FormAction

type SetAuthUserDataActionPayloudType = {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};
type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA;
  payload: SetAuthUserDataActionPayloudType;
};
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType =>
({
  type: SET_USER_DATA,
  payload: { id, email, login, isAuth },
});
type GetCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS;
  payload: { captchaUrl: string | null };
};
export const getCaptchaUrlSuccess = (captchaUrl: string | null): GetCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

export const getAuth = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch) => {
  let response: any = await authAPI.getAuthMe();
  if (response.resultCode === 0) {
    let { id, email, login } = response.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> =>
  async (dispatch) => {
    let response: any = await authAPI.login(
      email,
      password,
      rememberMe,
      captcha
    );
    if (response.resultCode === 0) {
      dispatch(getAuth());
      dispatch(getCaptchaUrlSuccess(null));
    } else {
      if (response.resultCode === 10) {
        dispatch(getCaptchaURL());
      }
      let message = response.messages.length > 0 ? response.messages[0] : "Some error";
      let action = stopSubmit("Login", { _error: message });
      dispatch(action);
    }
  };
export const getCaptchaURL = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch) => {
  debugger;
  const response: any = await securityAPI.getCaptcha();
  const captchaUrl = response.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};
export const logout = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch) => {
  let response: any = await authAPI.logout();
  if (response.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
