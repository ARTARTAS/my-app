import { instance } from './API';

type getUsersResponseType = {
    items: [
        {
            name: string,
            id: number,
            photos: {
                small: string | null,
                large: string | null
            },
            status: string | null,
            followed: boolean
        }
    ],
    totalCount: number,
    error: string | null
}
type followUnfollowResponseType = {
    resultCode: number
    messages: [string],
    data: {}
}

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return (
            instance.get<getUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
        ).then(response => response.data);
    },
    follow(id: number) {
        return (
            instance.post<followUnfollowResponseType>(`follow/${id}`)
        ).then(response => response.data);
    },
    unFollow(id: number) {
        return (
            instance.delete<followUnfollowResponseType>(`follow/${id}`)
        ).then(response => response.data);
    }
}
