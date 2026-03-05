import { get } from 'src/api/base.api'

export interface PaymentHistory {
    id: string
    user_id: number
    transaction_id: string
    payment_option: string
    token_amount: number
    vnd_amount: number
    status: 'pending' | 'completed' | 'failed' | 'canceled'
    qr_code: string
    qr_data_url: string
    updated_at: string
}

/**
 * Fetches the payment history for a specific user.
 * @param userId - The ID of the user whose payment history to retrieve.
 * @returns A promise that resolves to an array of payment history records.
 */
export const getUserPayments = async (
    userId: number,
): Promise<PaymentHistory[]> => {
    try {
        const endpoint = '/payment/user-payments'
        const params = { user_id: userId }

        const paymentHistory = await get<PaymentHistory[]>(endpoint, params)

        return paymentHistory
    } catch (error) {
        console.error('Error fetching user payment history:', error)
        throw error
    }
}
