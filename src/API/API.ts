import axios from "axios";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "9abce9b3-9b71-482c-a9b4-5d1ca405fb86",
    }
})

export type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

export enum ResultCodeEnum {
    "OK" = 0,
    "Request is invalid" = 1,
}
export enum ResultCodeForCaptchaEnum {
    "Captcha is required" = 10
}
