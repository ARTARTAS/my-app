import { type } from "os";
import { getAuth } from "./auth-reducer";

const SET_INITIALIZED = "SET-INITIALIZED";

export type InitialStateType = {
  initialized: boolean;
};

let initialState: InitialStateType = {
  initialized: false,
};

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

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuth());
  Promise.all([promise]).then(() => {
    dispatch(initialization());
  });
};

export default appReducer;
