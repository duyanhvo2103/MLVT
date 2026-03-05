export interface User {
    avatar: string;
    avatar_folder: string;
    created_at: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    password: string;
    premium: boolean;
    role: string;
    status: string;
    updated_at: string;
    username: string;
}

export interface GetUserResponse {
    user: User;
}

export interface ListUser {
    users: User[];
}

export interface UserUpdateData {
    premium: boolean;
    status: string;
    role: string;
}

export interface AvatarResponse {
    avatar_download_url: string;
}

export interface GetPresignedURL {
    upload_url: string
}