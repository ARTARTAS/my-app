import { instance, ResultCodeEnum, ResultCodeForCaptchaEnum } from './API';
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
