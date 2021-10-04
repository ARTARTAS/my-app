const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';

let initialState = {
    users: [
        {
            id: 1,
            photoURL: "https://html5css.ru/howto/img_avatar.png",
            followed: true,
            fullName: 'Dmitriy',
            status: 'User status 1',
            location: {
                city: 'Kyiv',
                country: 'Ukraine'
            }
        },
        {
            id: 2,
            photoURL: "https://html5css.ru/howto/img_avatar.png",
            followed: false,
            fullName: 'Petya',
            status: 'User status 2',
            location: {
                city: 'Moscow',
                country: 'Russia'
            }
        },
        {
            id: 3,
            photoURL: "https://html5css.ru/howto/img_avatar.png",
            followed: true,
            fullName: 'Vasya',
            status: 'User status 3',
            location: {
                city: 'Odessa',
                country: 'Ukraine'
            }
        },
        {
            id: 4,
            photoURL: "https://html5css.ru/howto/img_avatar.png",
            followed: true,
            fullName: 'Viktor',
            status: 'User status 4',
            location: {
                city: 'Texas',
                country: 'USA'
            }
        }
    ]
}

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
                users: [...state.users, ...action.users]
            }
        default:
            return state;
    }

}

export const followActionCreator = (userId) => ({ type: FOLLOW, userId })
export const unfollowActionCreator = (userId) => ({ type: UNFOLLOW, userId })
export const setUsersActionCreator = (users) => ({ type: SET_USERS, users })




export default usersReducer;