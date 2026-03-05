import axios from 'axios';
import baseApi from './base.api'; 

interface LoginResponse {
    token: string;
    user_id: string;
}

interface LoginData {
    email: string;
    password: string;
}

export const loginUser = async (loginData: LoginData): Promise<LoginResponse> => {
    try {
        const response = await baseApi.post<LoginResponse>('/users/login', loginData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error;
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};