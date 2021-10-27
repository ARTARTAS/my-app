import { login } from './../redux/auth-reducer';
import axios, { AxiosResponse } from "axios";
import { ProfileType } from "../redux/profile-reducer";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "a51a8971-a60a-44b1-b2f1-370626f8ae91",
    }
})

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return (
            instance.get(`users?page=${currentPage}&count=${pageSize}`)
        ).then(response => response.data);
    },
    follow(id: number) {
        return (
            instance.post(`follow/${id}`)
        ).then(response => response.data);
    },
    unFollow(id: number) {
        return (
            instance.delete(`follow/${id}`)
        ).then(response => response.data);
    }
}

export enum ResultCodeEnum {
    "OK" = 0,
    "Request is invalid" = 1,
}
export enum ResultCodeForCaptchaEnum {
    "Captcha is required" = 10
}

type getAuthMeResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodeEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: {
        data: {
            userId: number
        }
        resultCode: ResultCodeEnum | ResultCodeForCaptchaEnum
        messages: Array<string>
    }

}
type LogoutResponseType = {
    data: {}
    resultCode: ResultCodeEnum
    messages: Array<string>
    fieldsErrors: Array<string>
}
type LoginMeDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
export const authAPI = {
    getAuthMe() {
        return (
            instance.get<getAuthMeResponseType>(`auth/me`)
        ).then(response => response.data);
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<LoginMeDataType, LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha }).then(response => response.data)
    },
    logout() {
        return (
            instance.delete<LogoutResponseType>(`auth/login`)
        ).then(response => response.data);
    }
}

export const profileAPI = {
    getProfile(id: number) {
        return (
            instance.get(`profile/${id}`)
        ).then(response => response.data);
    },
    getStatus(id: number) {
        return (
            instance.get(`profile/status/${id}`)
        ).then(response => response.data);
    },
    updateStatus(text: string) {
        return (
            instance.put(`profile/status`, { status: text }).then(response => (response.data))
        )
    },
    savePhoto(photo: Blob) {
        let formData = new FormData();
        formData.append("image", photo)
        return (
            instance.put(`profile/photo`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(response => (response.data))
        )
    },
    saveProfile(formData: ProfileType) {
        return (
            instance.put(`/profile`, formData
            ).then(response => (response.data))
        )
    },
}

export const securityAPI = {
    getCaptcha() {
        return (
            instance.get(`security/get-captcha-url`)
        ).then(response => response.data);
    },

}