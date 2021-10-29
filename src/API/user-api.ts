import { UsersType } from './../redux/users-reducer';
import { instance, ResponseType } from './API';

type getUsersResponseType = {
    items: Array<UsersType>,
    totalCount: number,
    error: string | null
}

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return (
            instance.get<getUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
        ).then(response => response.data);
    },
    follow(id: number) {
        return (
            instance.post<ResponseType>(`follow/${id}`)
        ).then(response => response.data);
    },
    unFollow(id: number) {
        return (
            instance.delete<ResponseType>(`follow/${id}`)
        ).then(response => response.data);
    }
}
