import { get, put } from '../../../api/base.api'
import { GetUserResponse, UserUpdateData } from '../../../types/Response/User'

export const getUser = async (userId: string): Promise<GetUserResponse> => {
    return get<GetUserResponse>(`/users/${userId}`) as Promise<GetUserResponse>
}

export const getUserDetails = async (): Promise<GetUserResponse> => {
    return get<GetUserResponse>(
        `/users/user-details`,
    ) as Promise<GetUserResponse>
}

export const updateUser = async (
    userId: string,
    updatedData: UserUpdateData,
): Promise<string> => {
    return put<string, UserUpdateData>(
        `/users/${userId}`,
        updatedData,
    ) as Promise<string>
}

export const changePassword = async (
    userId: string,
    oldPassword: string,
    newPassword: string,
): Promise<string> => {
    return put<string>(`/users/${userId}/change-password`, {
        old_password: oldPassword,
        new_password: newPassword,
    }) as Promise<string>
}

export const getAvatarDownloadUrl = async (userId: string): Promise<string> => {
    const response = (await get<{ avatar_download_url: string }>(
        `/users/${userId}/avatar-download-url`,
    )) as { avatar_download_url: string }

    return response.avatar_download_url
}

export const updateAvatar = async (userId: string, fileName: string) => {
    return put<string>(`/users/${userId}/update-avatar`, null, {
        params: {
            user_id: userId,
            file_name: fileName,
        },
    }) as Promise<string>
}
