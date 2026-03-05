export interface User {
    avatar?: string;
    avatar_folder: string;
    id: number;
    created_at: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    role: string;
    status: number;
    updated_at: string;
    username: string;
    wallet_balance: number;
    premium?: boolean;
}

export interface GetUserResponse {
    user: User;
}

export interface UserUpdateData {
    first_name: string;
    last_name: string;
    username?: string;
    email?: string;
    role?: string;
    status?: number;
    premium?: boolean;
    avatar?: string;
}

export type UserWithAvatar = User & { avatarSrc: string };
