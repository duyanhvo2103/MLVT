import { AxiosResponse } from "axios";
import * as api from "../../../api/base.api";

function isAxiosResponse<T>(response: any): response is AxiosResponse<T> {
    return (
        response && response.status !== undefined && response.data !== undefined
    );
}

interface LoginPayload {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user_id: string;
}

interface RegisterPayload {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

interface RegisterResponse {
    message: string;
}

// --- API Functions ---

/**
 * Logs a user in by sending their credentials to the server.
 * @param payload - The user's email and raw password.
 * @returns A promise that resolves with the authentication token and user ID.
 */
export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    const result = await api.post<LoginResponse>("/users/login", payload);
    if (isAxiosResponse<LoginResponse>(result)) {
        return result.data;
    } else {
        return result;
    }
};

/**
 * Registers a new user.
 */
export const register = async (
    payload: RegisterPayload
): Promise<RegisterResponse> => {
    const result = await api.post<RegisterResponse>("/users/register", payload);

    if (isAxiosResponse<RegisterResponse>(result)) {
        return result.data;
    } else {
        return result;
    }
};
