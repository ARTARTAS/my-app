import { usersAPI } from "../API/API";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';
const TOGGLE_FOLLOW_REQUEST = 'TOGGLE-FOLLOW-REQUEST';

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followRequest: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true };
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false };
                    }
                    return u;
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case TOGGLE_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_FOLLOW_REQUEST:
            return {
                ...state,
                followRequest: action.followRequest ? [...state.followRequest, action.id] : state.followRequest.filter(id => id !== action.id)
            }
        default:
            return state;
    }

};

export const followUser = (userId) => ({ type: FOLLOW, userId });
export const unfollowUser = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });
export const setFetching = (isFetching) => ({ type: TOGGLE_FETCHING, isFetching });
export const setFollowRequest = (followRequest, id) => ({ type: TOGGLE_FOLLOW_REQUEST, followRequest, id });

export const requestUsers = (page, pageSize) => async (dispatch) => {
    dispatch(setFetching(true));
    let response = await usersAPI.getUsers(page, pageSize);
    dispatch(setFetching(false));
    dispatch(setUsers(response.items));
    dispatch(setTotalUsersCount(response.totalCount));
    dispatch(setCurrentPage(page))
};

export const follow = (id) => async (dispatch) => {
    dispatch(setFollowRequest(true, id))
    let response = await usersAPI.follow(id);

    if (response.resultCode === 0) {
        dispatch(followUser(id));
    }
    dispatch(setFollowRequest(false, id));
};

export const unFollow = (id) => async (dispatch) => {
    dispatch(setFollowRequest(true, id));
    let response = await usersAPI.unFollow(id);
    if (response.resultCode === 0) {
        dispatch(unfollowUser(id));
    }
    dispatch(setFollowRequest(false, id));
};

export default usersReducer;
