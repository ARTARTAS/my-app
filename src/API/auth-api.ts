import { instance, ResponseType, ResultCodeEnum, ResultCodeForCaptchaEnum } from './API';

type getAuthMeDataResponseType = {
    id: number,
    email: string,
    login: string
}

type LoginDataResponseType = {
    resultCode: number,
    messages: Array<string>,
    data: {
        userId: number
    }
    
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
            instance.get<ResponseType<getAuthMeDataResponseType>>(`auth/me`)
        ).then(response => response.data);
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<LoginMeDataType, ResponseType<LoginDataResponseType, ResultCodeEnum | ResultCodeForCaptchaEnum>>(`auth/login`, { email, password, rememberMe, captcha });
    },
    logout() {
        return (
            instance.delete<ResponseType>(`auth/login`)
        ).then(response => response.data);
    }
}
