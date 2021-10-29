import axios from "axios";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "a51a8971-a60a-44b1-b2f1-370626f8ae91",
    }
})

export enum ResultCodeEnum {
    "OK" = 0,
    "Request is invalid" = 1,
}
export enum ResultCodeForCaptchaEnum {
    "Captcha is required" = 10
}