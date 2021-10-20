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
    follow(id) {
        return (
            instance.post(`follow/${id}`)
        ).then(response => response.data);
    },
    unFollow(id) {
        return (
            instance.delete(`follow/${id}`)
        ).then(response => response.data);
    }
}

export const authAPI = {
    getAuthMe() {
        return (
            instance.get(`auth/me`)
        ).then(response => response.data);
    },
    login(email, password, rememberMe = false) {
        let body = {
            email: email,
            password: password,
            rememberMe: rememberMe
        }
        return (
            instance.post(`/auth/login`, body)
        ).then(response => response.data);
    },
    logout() {
        return (
            instance.delete(`/auth/login`)
        ).then(response => response.data);
    },

}

export const profileAPI = {
    getProfile(id) {
        return (
            instance.get(`profile/${id}`)
        ).then(response => response.data);
    },
    getStatus(id) {
        return (
            instance.get(`profile/status/${id}`)
        ).then(response => response.data);
    },
    updateStatus(text) {
        return (
            instance.put(`profile/status`, { status: text }).then(response => (response.data))
        )
    },
    savePhoto(photo) {
        let formData = new FormData();
        formData.append("image", photo)
        return (
            instance.put(`/profile/photo`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(response => (response.data))
        )
    },
}