import { ResultCodeEnum, ResultCodeForCaptchaEnum } from './../API/API';
import { ThunkAction } from 'redux-thunk';
import { AppStateType, InferActionsTypes } from './redux-store';
import { FormAction, stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../API/API";

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

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case 'SET_USER_DATA': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'GET_CAPTCHA_URL_SUCCESS': {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
type ActionTypes = InferActionsTypes<typeof actions>

export const actions = {
  setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) =>
  ({
    type: 'SET_USER_DATA',
    payload: { id, email, login, isAuth },
  } as const),
  getCaptchaUrlSuccess: (captchaUrl: string | null) => ({
    type: 'GET_CAPTCHA_URL_SUCCESS',
    payload: { captchaUrl },
  } as const)
}

export const getAuth = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch) => {
  let response = await authAPI.getAuthMe();
  if (response.resultCode === ResultCodeEnum.OK) {
    let { id, email, login } = response.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkAction<Promise<void>, AppStateType, unknown, FormAction> =>
  async (dispatch) => {
    let response = await authAPI.login(
      email,
      password,
      rememberMe,
      captcha
    );
    if (response.resultCode === ResultCodeEnum.OK) {
      dispatch(getAuth());
      dispatch(actions.getCaptchaUrlSuccess(null));
    } else {
      if (response.resultCode === ResultCodeForCaptchaEnum['Captcha is required']) {
        dispatch(getCaptchaURL());
      }
      let message = response.messages.length > 0 ? response.messages[0] : "Some error";
      let action = stopSubmit("Login", { _error: message });
      dispatch(action); 
    }
  };
export const getCaptchaURL = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch) => {
  debugger;
  const response = await securityAPI.getCaptcha();
  const captchaUrl = response.url;
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};
export const logout = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch) => {
  let response = await authAPI.logout();
  if (response.resultCode === ResultCodeEnum.OK) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
