import { PhotosType, ProfileType } from "../redux/profile-reducer";
import { instance, ResponseType } from './API';
type savePhotoResponseType = {
    photos: PhotosType
}
export const profileAPI = {
    getProfile(id: number) {
        return (
            instance.get<ProfileType>(`profile/${id}`).then(response => response.data)
        );
    },
    getStatus(id: number) {
        return (
            instance.get<string>(`profile/status/${id}`)
        ).then(response => response.data)
    },
    updateStatus(text: string) {
        return (
            instance.put(`profile/status`, { status: text }).then(response => (response.data))
        )
    },
    savePhoto(photo: File) {
        let formData = new FormData();
        formData.append("image", photo)
        return (
            instance.put<FormData, ResponseType<savePhotoResponseType>>(`profile/photo`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        )
    },
    saveProfile(formData: ProfileType) {
        return (
            instance.put(`/profile`, formData
            ).then(response => (response.data))
        )
    },
}
