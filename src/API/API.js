import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "a51a8971-a60a-44b1-b2f1-370626f8ae91",
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return (
            instance.get(`users?page=${currentPage}&count=${pageSize}`)
        ).then(response => response.data);
    },
    getAuthMe() {
        return (
            instance.get(`auth/me`)
        ).then(response => response.data);
    },
    follow(id) {
        return (
            instance.post(`follow/${id}`)
        ).then(response => response.data);
    },
    unFollow(id) {
        return (
            instance.delete(`follow/${id}`)
        ).then(response => response.data);
    },
    getProfile(id) {
        return (
            instance.get(`profile/${id}`)
        ).then(response => response.data);
    }
}


