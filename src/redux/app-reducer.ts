import { AppStateType, InferActionsTypes } from './redux-store';
import { getAuth } from "./auth-reducer";
import { ThunkAction } from 'redux-thunk';

export type InitialStateType = {
  initialized: boolean;
};

let initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case 'SET_INITIALIZED': {
      return {
        ...state,
        initialized: true,
      };
    }
    default:
      return state;
  }
}

type ActionTypes = InferActionsTypes<typeof actions>

export const actions = {
  initialization: () => ({ type: 'SET_INITIALIZED' } as const)
}

export const initializeApp = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch) => {
  let promise = dispatch(getAuth());
  Promise.all([promise]).then(() => {
    dispatch(actions.initialization());
  });
};

export default appReducer;
