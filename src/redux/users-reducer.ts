import { usersAPI } from "../API/API";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const TOGGLE_FETCHING = "TOGGLE_FETCHING";
const TOGGLE_FOLLOW_REQUEST = "TOGGLE-FOLLOW-REQUEST";

type PhotosType = {
  small: string | null;
  large: string | null;
};

type UsersType = {
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

const usersReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    case SET_USERS:
      return {
        ...state,
        users: [...action.users],
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    case TOGGLE_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case TOGGLE_FOLLOW_REQUEST:
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

type FollowUserActionType = {
  type: typeof FOLLOW;
  userId: number;
};
export const followUser = (userId: number): FollowUserActionType => ({
  type: FOLLOW,
  userId,
});

type UnfollowUserActionType = {
  type: typeof UNFOLLOW;
  userId: number;
};
export const unfollowUser = (userId: number): UnfollowUserActionType => ({
  type: UNFOLLOW,
  userId,
});

type SetUsersActionType = {
  type: typeof SET_USERS;
  users: [];
};
export const setUsers = (users: []): SetUsersActionType => ({
  type: SET_USERS,
  users,
});

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};
export const setCurrentPage = (
  currentPage: number
): SetCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  totalUsersCount: number;
};
export const setTotalUsersCount = (
  totalUsersCount: number
): SetTotalUsersCountActionType => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
});

type SetFetchingActionType = {
  type: typeof TOGGLE_FETCHING;
  isFetching: boolean;
};
export const setFetching = (isFetching: boolean): SetFetchingActionType => ({
  type: TOGGLE_FETCHING,
  isFetching,
});

type SetFollowRequestActionType = {
  type: typeof TOGGLE_FOLLOW_REQUEST;
  followRequest: any;
  id: number;
};
export const setFollowRequest = (
  followRequest: any,
  id: number
): SetFollowRequestActionType => ({
  type: TOGGLE_FOLLOW_REQUEST,
  followRequest,
  id,
});

export const requestUsers =
  (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(setFetching(true));
    let response: any = await usersAPI.getUsers(page, pageSize);
    dispatch(setFetching(false));
    dispatch(setUsers(response.items));
    dispatch(setTotalUsersCount(response.totalCount));
    dispatch(setCurrentPage(page));
  };

export const follow = (id: number) => async (dispatch: any) => {
  dispatch(setFollowRequest(true, id));
  let response: any = await usersAPI.follow(id);

  if (response.resultCode === 0) {
    dispatch(followUser(id));
  }
  dispatch(setFollowRequest(false, id));
};

export const unFollow = (id: number) => async (dispatch: any) => {
  dispatch(setFollowRequest(true, id));
  let response: any = await usersAPI.unFollow(id);
  if (response.resultCode === 0) {
    dispatch(unfollowUser(id));
  }
  dispatch(setFollowRequest(false, id));
};

export default usersReducer;
