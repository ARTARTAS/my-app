import { AppStateType } from './redux-store';
import { getAuth } from "./auth-reducer";
import { ThunkAction } from 'redux-thunk';

const SET_INITIALIZED = "SET-INITIALIZED";

export type InitialStateType = {
  initialized: boolean;
};

let initialState: InitialStateType = {
  initialized: false,
};

type ActionTypes = InitializationActionType

const appReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_INITIALIZED: {
      return {
        ...state,
        initialized: true,
      };
    }
    default:
      return state;
  }
};

type InitializationActionType = {
  type: typeof SET_INITIALIZED;
};

export const initialization = (): InitializationActionType => ({
  type: SET_INITIALIZED,
});

export const initializeApp = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch) => {
  let promise = dispatch(getAuth());
  Promise.all([promise]).then(() => {
    dispatch(initialization());
  });
};

export default appReducer;
