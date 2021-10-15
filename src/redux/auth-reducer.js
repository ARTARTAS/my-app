import { stopSubmit } from "redux-form";
import { authAPI } from "../API/API";

const SET_USER_DATA = 'SET-USER-DATA'

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false

}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data
            }
        }
        default:
            return state;
    }
}

export const setAuthUserData = (id, email, login, isAuth) => ({ type: SET_USER_DATA, data: { id, email, login, isAuth } });

export const getAuth = () => {
    return (dispatch) => {
        return authAPI.getAuthMe().then((data) => {
            if (data.resultCode === 0) {
                let { id, email, login } = data.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
        });
    }
}

export const login = (email, password, rememberMe) => {
    return (dispatch) => {
        authAPI.login(email, password, rememberMe).then((data) => {
            if (data.resultCode === 0) {
                dispatch(getAuth())
            } else {
                console.log(data)
                let message = data.messages.length > 0 ? data.messages[0] : "Some error";
                let action = stopSubmit("Login", { _error: message });
                dispatch(action);
            }
        });
    }
}

export const logout = () => {
    return (dispatch) => {
        authAPI.logout().then((data) => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
    }
}

export default authReducer;