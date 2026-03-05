import { AxiosResponse } from 'axios'
import { get, post } from 'src/api/base.api'
import { TokenPlan } from '../types/TokenPlan'

export const getTokenPlans = async (): Promise<TokenPlan[]> => {
    try {
        const response: AxiosResponse<TokenPlan[]> = await get(
            '/payment/options',
            undefined,
            { getFullResponse: true },
        )

        return response.data
    } catch (error) {
        console.error('Error fetching token plans:', error)
        throw error
    }
}

export interface PaymentResponse {
    id: string
    user_id: number
    transaction_id: string
    payment_option: string
    token_amount: number
    vnd_amount: number
    status: 'pending' | 'completed' | 'failed' | 'canceled'
    qr_code: string
    qr_data_url: string
    created_at: string
}

export const createPayment = async (
    userId: number,
    option: string,
): Promise<PaymentResponse> => {
    try {
        const endpoint = `/payment/create?user_id=${userId}&option=${option}`
        const response = await post<PaymentResponse>(endpoint)
        return response
    } catch (error) {
        console.error('Error creating payment:', error)
        throw error
    }
}
