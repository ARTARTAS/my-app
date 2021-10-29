import { usersAPI } from './../API/user-api';
import { AppStateType, InferActionsTypes } from "./redux-store";
import { ResultCodeEnum} from "../API/API";
import { ThunkAction } from "redux-thunk";

type PhotosType = {
  small: string | null;
  large: string | null;
};
export type UsersType = {
  id: number;
  name: string;
  status: string | null;
  photos: PhotosType;
  followed: boolean;
};
export type InitialStateType = {
  users: Array<UsersType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followRequest: Array<number>; //array of users id
};

let initialState: InitialStateType = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followRequest: [],
};

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };
    case "UNFOLLOW":
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    case "SET_USERS":
      return {
        ...state,
        users: [...action.users],
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case "SET_TOTAL_USERS_COUNT":
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    case "TOGGLE_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case "TOGGLE_FOLLOW_REQUEST":
      return {
        ...state,
        followRequest: action.followRequest
          ? [...state.followRequest, action.id]
          : state.followRequest.filter((id) => id !== action.id),
      };
    default:
      return state;
  }
};

type ActionTypes = InferActionsTypes<typeof actions>

export const actions = {
  followUser: (userId: number) => ({ type: 'FOLLOW', userId, } as const),
  unfollowUser: (userId: number) => ({ type: 'UNFOLLOW', userId, } as const),
  setUsers: (users: Array<UsersType>) => ({ type: 'SET_USERS', users, } as const),
  setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage, } as const),
  setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', totalUsersCount, } as const),
  setFetching: (isFetching: boolean) => ({ type: 'TOGGLE_FETCHING', isFetching, } as const),
  setFollowRequest: (followRequest: any, id: number) => ({ type: 'TOGGLE_FOLLOW_REQUEST', followRequest, id, } as const)
}

export const requestUsers = (page: number, pageSize: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> =>
  async (dispatch) => {
    dispatch(actions.setFetching(true));
    let response = await usersAPI.getUsers(page, pageSize);
    dispatch(actions.setFetching(false));
    dispatch(actions.setUsers(response.items));
    dispatch(actions.setTotalUsersCount(response.totalCount));
    dispatch(actions.setCurrentPage(page));
  };
export const follow = (id: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> =>
  async (dispatch) => {
    dispatch(actions.setFollowRequest(true, id));
    let response = await usersAPI.follow(id);

    if (response.resultCode === ResultCodeEnum.OK) {
      dispatch(actions.followUser(id));
    }
    dispatch(actions.setFollowRequest(false, id));
  };
export const unFollow = (id: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> =>
  async (dispatch) => {
    dispatch(actions.setFollowRequest(true, id));
    let response = await usersAPI.unFollow(id);
    if (response.resultCode === ResultCodeEnum.OK) {
      dispatch(actions.unfollowUser(id));
    }
    dispatch(actions.setFollowRequest(false, id));
  };

export default usersReducer;
