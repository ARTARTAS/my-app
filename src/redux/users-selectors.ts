import { AppStateType } from "./redux-store";
// import { createSelector } from "reselect";

export const getUsers = (state: AppStateType) => {
  return state.usersPage.users;
};

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
};

export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
};

export const getFollowRequest = (state: AppStateType) => {
  return state.usersPage.followRequest;
};

// export const reselectSelector = createSelector(getUsers, (users)=>{
// debugger
//     return users.filter(u => u.status);
// })
