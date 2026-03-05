import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios'
import { apiUrl } from '../Environment'

const axiosInstance: AxiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: false,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        // BUG FIX: Use the same key 'authToken' here as in setAuthToken
        const token = localStorage.getItem('authToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error: AxiosError) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response) {
            const status = error.response.status
            switch (status) {
                case 401:
                    console.error('Unauthorized access. Redirecting to login.')
                    // Also clear the broken token before redirecting
                    localStorage.removeItem('authToken')
                    window.location.href = '/login'
                    break
                case 403:
                    console.error(
                        'Forbidden: You do not have permission to access this resource.',
                    )
                    break
                case 500:
                    console.error(
                        'Server Error: An unexpected error occurred on the server.',
                    )
                    break
                default:
                    console.error(`API Error: ${status} - ${error.message}`)
                    break
            }
        } else if (error.request) {
            console.error(
                'Network Error: No response received from server.',
                error.message,
            )
        } else {
            console.error('Request Setup Error:', error.message)
        }
        return Promise.reject(error)
    },
)

export function setAuthToken(token: string | null): void {
    if (token) {
        localStorage.setItem('authToken', token)

        axiosInstance.defaults.headers.common['Authorization'] =
            `Bearer ${token}`
    } else {
        localStorage.removeItem('authToken')
        delete axiosInstance.defaults.headers.common['Authorization']
    }
}

type ApiConfig = AxiosRequestConfig & {
    getFullResponse?: boolean
}

// --- GET Overloads ---
export function get<T>(
    url: string,
    params: object | undefined,
    config: ApiConfig & { getFullResponse: true },
): Promise<AxiosResponse<T>>
export function get<T>(
    url: string,
    params?: object,
    config?: ApiConfig & { getFullResponse?: false },
): Promise<T>
export async function get<T>(
    url: string,
    params?: object,
    config?: ApiConfig,
): Promise<T | AxiosResponse<T>> {
    const response = await axiosInstance.get<T>(url, { params, ...config })
    return config?.getFullResponse ? response : response.data
}

// --- POST Overloads ---
export function post<T, U = any>(
    url: string,
    data: U | undefined,
    config: ApiConfig & { getFullResponse: true },
): Promise<AxiosResponse<T>>
export function post<T, U = any>(
    url: string,
    data?: U,
    config?: ApiConfig & { getFullResponse?: false },
): Promise<T>
export async function post<T, U = any>(
    url: string,
    data?: U,
    config?: ApiConfig,
): Promise<T | AxiosResponse<T>> {
    const response = await axiosInstance.post<T>(url, data, config)
    return config?.getFullResponse ? response : response.data
}

// --- PUT Overloads ---
export function put<T, U = any>(
    url: string,
    data: U | undefined,
    config: ApiConfig & { getFullResponse: true },
): Promise<AxiosResponse<T>>
export function put<T, U = any>(
    url: string,
    data?: U,
    config?: ApiConfig & { getFullResponse?: false },
): Promise<T>
export async function put<T, U = any>(
    url: string,
    data?: U,
    config?: ApiConfig,
): Promise<T | AxiosResponse<T>> {
    const response = await axiosInstance.put<T>(url, data, config)
    return config?.getFullResponse ? response : response.data
}

// --- PATCH Overloads ---
export function patch<T, U = any>(
    url: string,
    data: U | undefined,
    config: ApiConfig & { getFullResponse: true },
): Promise<AxiosResponse<T>>
export function patch<T, U = any>(
    url: string,
    data?: U,
    config?: ApiConfig & { getFullResponse?: false },
): Promise<T>
export async function patch<T, U = any>(
    url: string,
    data?: U,
    config?: ApiConfig,
): Promise<T | AxiosResponse<T>> {
    const response = await axiosInstance.patch<T>(url, data, config)
    return config?.getFullResponse ? response : response.data
}

// --- DELETE Overloads ---
export function del<T = any>(
    url: string,
    config: ApiConfig & { getFullResponse: true },
): Promise<AxiosResponse<T>>
export function del<T = any>(
    url: string,
    config?: ApiConfig & { getFullResponse?: false },
): Promise<T>
export async function del<T = any>(
    url: string,
    config?: ApiConfig,
): Promise<T | AxiosResponse<T>> {
    const response = await axiosInstance.delete<T>(url, config)
    return config?.getFullResponse ? response : response.data
}

// It's fine to export the instance for rare edge cases, but prefer using the helpers.
export default axiosInstance
