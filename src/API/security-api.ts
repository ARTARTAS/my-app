import { instance } from './API';

type getCaptchaResponseType = {
    url: string
}
export const securityAPI = {
    getCaptcha() {
        return (
            instance.get<getCaptchaResponseType>(`security/get-captcha-url`)
        ).then(response => response.data);
    },

}